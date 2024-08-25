import { useNavigate } from "react-router-dom";
import { FieldConfig } from "../components/form/SmartField/types";
import { SmartForm } from "../components/form/SmartForm";
import { useSmartForm } from "../components/form/SmartForm/hooks/useSmartForm";
import { userService, UserSignupPayload } from "../services/userService";
import { useState } from "react";
import { Alert } from "../components/ui/Alert";

const signupFormFields: FieldConfig[] = [
  {
    id: "fullName",
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
];

const initialData = {
  email: "jeferson@gmail.com",
  username: "jeferson",
  fullName: "jeferson",
  password: "jeferson",
  confirmPassword: "jeferson",
};

export function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = (data: UserSignupPayload) => {
    return userService
      .signup(data)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };
  const formState = useSmartForm({
    dataValue: initialData,
    fields: signupFormFields,
    onSubmit,
  });
  return (
    <>
      <SmartForm submitText="Create account" formState={formState} />
      {error && <Alert color="error">{error}</Alert>}
    </>
  );
}
