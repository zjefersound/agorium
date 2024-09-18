import { useNavigate } from "react-router-dom";
import { FieldConfig } from "../../components/form/SmartField/types";
import { SmartForm } from "../../components/form/SmartForm";
import { useSmartForm } from "../../components/form/SmartForm/hooks/useSmartForm";
import {
  userService,
  UserUpdatePasswordPayload,
} from "../../services/userService";
import { useState } from "react";
import { Alert } from "../../components/ui/Alert";
import { TOAST_MESSAGES } from "../../constants/toastMessages";
import { useToast } from "../../hooks/useToast";
import { userFields } from "../../constants/forms/userFields";

const userPasswordFormFields: FieldConfig[] = [
  userFields.currentPassword,
  userFields.password,
  userFields.confirmPassword,
];

export function UserPasswordForm() {
  const { launchToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = (data: UserUpdatePasswordPayload) => {
    return userService
      .updatePassword({
        password: data.password,
        currentPassword: data.currentPassword,
      })
      .then((res) => {
        navigate("/profile");
        launchToast({
          title: TOAST_MESSAGES.UserPassword.createdTitle,
          description: TOAST_MESSAGES.UserPassword.createdDescription,
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
    fields: userPasswordFormFields,
    onSubmit,
  });
  return (
    <>
      <SmartForm submitText="Save information" formState={formState} />
      {error && (
        <Alert color="error" className="mt-6">
          {error}
        </Alert>
      )}
    </>
  );
}
