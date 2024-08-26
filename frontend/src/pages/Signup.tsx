import { LogoHorizontal } from "../components/assets/LogoHorizontal";
import { Layout } from "../components/layout/Layout";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { PublicBackground } from "../components/layout/PublicBackground";
import { Link } from "react-router-dom";
import { SignupForm } from "../containers/SignupForm";

export function Signup() {
  return (
    <>
      <PublicBackground />
      <Layout className="flex z-10">
        <div className="py-12 px-6 w-[360px] max-w-full space-y-6 bg-agorium-900 m-auto">
          <LogoHorizontal />
          <Heading>Sign up</Heading>
          <SignupForm />
          <Text asChild>
            <span className="block text-center">
              Already has an account?
              <Link to="/login">
                <span className="text-amber-100 font-bold"> Log in</span>
              </Link>
            </span>
          </Text>
        </div>
      </Layout>
    </>
  );
}
