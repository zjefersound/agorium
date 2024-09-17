import { useNavigate } from "react-router-dom";
import { FieldConfig } from "../../components/form/SmartField/types";
import { SmartForm } from "../../components/form/SmartForm";
import { useSmartForm } from "../../components/form/SmartForm/hooks/useSmartForm";
import { userService, UserUpdateInfoPayload } from "../../services/userService";
import { useState } from "react";
import { Alert } from "../../components/ui/Alert";
import { TOAST_MESSAGES } from "../../constants/toastMessages";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";

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
];

export function UserInfoForm() {
  const { user, setUser } = useAuth();
  const dataValue = {
    fullName: user!.fullName,
    username: user!.username,
    email: user!.email,
  };
  const { launchToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = (data: UserUpdateInfoPayload) => {
    return userService
      .updateInfo(data)
      .then((res) => {
        setUser(res.data);
        navigate("/profile");
        launchToast({
          title: TOAST_MESSAGES.Signup.createdTitle,
          description: TOAST_MESSAGES.Signup.createdDescription,
        });
      })
      .catch((error) => {
        setError(
          error.response?.data?.error ||
            TOAST_MESSAGES.common.unexpectedErrorDescription,
        );
      });
  };
  const formState = useSmartForm({
    dataValue,
    fields: signupFormFields,
    onSubmit,
  });
  return (
    <>
      <SmartForm submitText="Save changes" formState={formState} />
      {error && <Alert color="error">{error}</Alert>}
    </>
  );
}
