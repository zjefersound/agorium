import { Layout } from "../components/layout/Layout";
import { Heading } from "../components/ui/Heading";
import { LogoHorizontal } from "../components/assets/LogoHorizontal";
import { Text } from "../components/ui/Text";
import { PublicBackground } from "../components/layout/PublicBackground";
import { Link } from "react-router-dom";
import { LoginForm } from "../containers/LoginForm";

export function Login() {
  return (
    <>
      <PublicBackground />
      <Layout className="flex z-10">
        <div className="py-12 px-6 w-[360px] max-w-full space-y-6 flex flex-col m-auto">
          <LogoHorizontal />
          <Heading>Login</Heading>
          <LoginForm />
          <Text asChild>
            <span className="block text-center">
              No account?
              <Link to="/signup">
                <span className="text-amber-100 font-bold"> Sign up</span>
              </Link>
            </span>
          </Text>
        </div>
      </Layout>
    </>
  );
}
