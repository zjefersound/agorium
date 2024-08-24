import { LogoHorizontal } from "../components/assets/LogoHorizontal";
import { Layout } from "../components/layout/Layout";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { useSmartForm } from "../components/form/SmartForm/hooks/useSmartForm";
import { SmartForm } from "../components/form/SmartForm";
import { PublicBackground } from "../components/layout/PublicBackground";
import { Link } from "react-router-dom";

export function Signup() {
  const formState = useSmartForm({
    fields: [
      {
        id: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter your name",
        validations: [
          {
            rule: (value) => value.trim().length >= 3,
            message: "Name must be at least 3 characters long",
          },
          {
            rule: (value) => value.split(" ").length > 1,
            message: "Enter your last name",
          },
        ],
      },
      {
        id: "username",
        label: "Username",
        type: "text",
        placeholder: "Enter your username",
        validations: [
          {
            rule: (value) => value.trim() !== "",
            message: "Username is required",
          },
          {
            rule: (value) => value.trim().length >= 3,
            message: "Name must be at least 3 characters long",
          },
        ],
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter your email",
        validations: [
          {
            rule: (value) => value.trim() !== "",
            message: "Email is required",
          },
          {
            rule: (value) => /\S+@\S+\.\S+/.test(value),
            message: "Invalid email address",
          },
        ],
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        validations: [
          {
            rule: (value) => value.trim() !== "",
            message: "Password is required",
          },
          {
            rule: (value) => value.length >= 6,
            message: "Password must be at least 6 characters long",
          },
        ],
      },
      {
        id: "confirmPassword",
        label: "Confirm password",
        type: "password",
        placeholder: "Enter your password",
        validations: [
          {
            rule: (value) => value.trim() !== "",
            message: "Password confirmation is required",
          },
          {
            rule: (value, form) => value === form.password,
            message: "Passwords do not match",
          },
        ],
      },
      {
        label: "Profile Picture",
        type: "file",
        id: "avatar",
        placeholder: "Drag & drop or select your profile picture",
        allowedFileTypes: ["image/*"],
        height: 200,
        width: 200,
      },
    ],
    onSubmit: async (data) => {
      console.log("Form submitted:", data);
    },
  });
  return (
    <>
      <PublicBackground />
      <Layout className="flex z-10">
        <div className="py-12 px-6 w-[360px] max-w-full space-y-6 bg-agorium-900 m-auto">
          <LogoHorizontal />
          <Heading>Sign up</Heading>
          <SmartForm submitText="Create account" formState={formState} />
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
