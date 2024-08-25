import { MdLockOutline, MdPersonOutline } from "react-icons/md";
import { Layout } from "../components/layout/Layout";
import { Heading } from "../components/ui/Heading";
import { LogoHorizontal } from "../components/assets/LogoHorizontal";
import { Button } from "../components/ui/Button";
import { Text } from "../components/ui/Text";
import { PublicBackground } from "../components/layout/PublicBackground";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSmartForm } from "../components/form/SmartForm/hooks/useSmartForm";
import { SmartField } from "../components/form/SmartField";
import { FieldConfig } from "../components/form/SmartField/types";

const loginFormFields: FieldConfig[] = [
  {
    id: "login",
    type: "text",
    label: "Username or email",
    placeholder: "Enter your username",
    Icon: MdPersonOutline,
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    Icon: MdLockOutline,
  },
];

export function Login() {
  const { handleLogin } = useAuth();
  const { data, handleChangeValue, serializedFields, errors, handleSubmit } =
    useSmartForm({
      fields: loginFormFields,
      onSubmit: handleLogin,
    });
  return (
    <>
      <PublicBackground />
      <Layout className="flex z-10">
        <form
          onSubmit={handleSubmit}
          className="py-12 px-6 w-[360px] max-w-full space-y-6 flex flex-col m-auto"
        >
          <LogoHorizontal />
          <Heading>Login</Heading>
          {serializedFields.map((field) => (
            <SmartField
              key={field.id}
              value={data[field.id]}
              onChangeValue={handleChangeValue}
              config={field}
              error={errors[field.id]}
            />
          ))}
          <Link
            to="/forgot-password"
            className="text-amber-100 text-xs font-semibold ml-auto"
          >
            Forgot password
          </Link>
          <Button className="w-full flex justify-center" behavior="submit">
            Login
          </Button>
          <Text asChild>
            <span className="block text-center">
              No account?
              <Link to="/signup">
                <span className="text-amber-100 font-bold"> Sign up</span>
              </Link>
            </span>
          </Text>
        </form>
      </Layout>
    </>
  );
}
