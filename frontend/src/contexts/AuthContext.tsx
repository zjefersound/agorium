import {
  createContext,
  PropsWithChildren,
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

export interface AuthProviderProps {
  authenticated: boolean;
  token: string;
  setToken: (token: string) => void;
  user: User | null;
  setUser: (user: User) => void;
  handleLogin: (data: UserLoginPayload) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthProviderProps>(
  {} as AuthProviderProps,
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
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
      .then((res) => setToken(res.data.token))
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
      api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.status === 401) {
            console.warn("Unauthorized: Needs to log in again");
            // this would be the moment to refresh the token.
            // If there's a permission or role based auth, this shouldn't always log out.
            handleLogout();
          }
          return Promise.reject(error);
        },
      );
      userService
        .me()
        .then((response) => {
          if (response.data) {
            setUser(response.data);
            setAuthenticated(true);
          }
        })
        .catch((error: AxiosError<IApiErrorResponse>) => {
          if (error.status === 401) {
            launchToast({
              title: TOAST_MESSAGES.common.sessionExpiredTitle,
              description: TOAST_MESSAGES.common.sessionExpiredDescription,
              color: "info",
            });
          } else {
            launchToast({
              title: error.response?.data.error
                ? TOAST_MESSAGES.common.sessionUnauthorizedTitle
                : TOAST_MESSAGES.common.unexpectedErrorTitle,
              description:
                typeof error.response?.data.error === "string"
                  ? error.response.data.error
                  : TOAST_MESSAGES.common.unexpectedErrorDescription,
              color: "danger",
            });
          }
          handleLogout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, authenticated, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
};
