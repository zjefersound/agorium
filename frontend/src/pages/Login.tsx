import { MdLockOutline, MdPersonOutline } from "react-icons/md";
import { TextInput } from "../components/form/TextInput";
import { Layout } from "../components/layout/Layout";
import { Heading } from "../components/ui/Heading";
import { LogoHorizontal } from "../components/assets/LogoHorizontal";
import { FormControl } from "../components/form/FormControl";
import { Button } from "../components/ui/Button";
import { Text } from "../components/ui/Text";
import { PublicBackground } from "../components/layout/PublicBackground";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <>
      <PublicBackground />
      <Layout className="flex z-10">
        <div className="py-12 px-6 w-[360px] max-w-full space-y-6 flex flex-col m-auto">
          <LogoHorizontal />
          <Heading>Login</Heading>
          <FormControl id="username" label="Username or email">
            <TextInput.Root>
              <TextInput.Icon>
                <MdPersonOutline />
              </TextInput.Icon>
              <TextInput.Input placeholder="Enter your username" />
            </TextInput.Root>
          </FormControl>
          <FormControl id="password" label="Password">
            <TextInput.Root>
              <TextInput.Icon>
                <MdLockOutline />
              </TextInput.Icon>
              <TextInput.Input placeholder="Enter your password" />
            </TextInput.Root>
          </FormControl>
          <Link
            to="/forgot-password"
            className="text-amber-100 text-xs font-semibold ml-auto"
          >
            Forgot password
          </Link>
          <Button className="w-full flex justify-center">Login</Button>
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
