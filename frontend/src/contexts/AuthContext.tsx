import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../services/api";
import { UserLoginPayload, userService } from "../services/userService";
import axios, { AxiosError } from "axios";
import { useToast } from "../hooks/useToast";
import { SplashScreen } from "../components/layout/SplashScreen";
import { User } from "../models/User";
import { TOAST_MESSAGES } from "../constants/toastMessages";
import { IApiErrorResponse } from "../models/IApiErrorResponse";

interface AuthProviderProps {
  authenticated: boolean;
  token: string;
  setToken: (token: string) => void;
  user: User | null;
  setUser: (user: User) => void;
  handleLogin: (data: UserLoginPayload) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthProviderProps>({} as AuthProviderProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { launchToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken_] = useState(localStorage.getItem("token") || "");
  const storedUser = localStorage.getItem("user");
  const [user, setUser_] = useState(
    storedUser ? (JSON.parse(storedUser) as User) : null,
  );

  const setUser = (newUser: User) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser_(newUser);
  };

  const setToken = (newToken: string) => {
    setToken_(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogin = async (data: UserLoginPayload) => {
    return await userService
      .login(data)
      .then((res) => {
        if (res.data.token) {
          setToken(res.data.token);
        }
      })
      .catch((err: AxiosError<IApiErrorResponse>) => {
        if (axios.isAxiosError(err) && err.response) {
          launchToast({
            title: TOAST_MESSAGES.Login.loginErrorTitle,
            description:
              typeof err.response.data.error === "string"
                ? err.response.data.error
                : "",
            color: "danger",
          });
        } else {
          launchToast({
            title: TOAST_MESSAGES.common.unexpectedErrorTitle,
            description: TOAST_MESSAGES.common.unexpectedErrorDescription,
            color: "danger",
          });
        }
      });
  };

  const handleLogout = () => {
    setToken("");
    delete api.defaults.headers.Authorization;
    localStorage.clear();
    setAuthenticated(false);
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = "Bearer " + token;

      userService
        .me()
        .then((response) => {
          if (response.data) {
            setUser(response.data);
            setAuthenticated(true);
          }
        })
        .catch(() => {
          launchToast({
            title: TOAST_MESSAGES.common.unexpectedErrorTitle,
            description: TOAST_MESSAGES.common.unexpectedErrorDescription,
            color: "danger",
          });
          handleLogout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      handleLogout();
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      authenticated,
      handleLogin,
      handleLogout,
      token,
      setToken,
      user,
      setUser,
    }),
    [token, authenticated, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
