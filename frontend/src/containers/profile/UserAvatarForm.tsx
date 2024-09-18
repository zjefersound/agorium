import { useNavigate } from "react-router-dom";
import { FieldConfig } from "../../components/form/SmartField/types";
import { SmartForm } from "../../components/form/SmartForm";
import { useSmartForm } from "../../components/form/SmartForm/hooks/useSmartForm";
import {
  userService,
  UserUpdateAvatarPayload,
} from "../../services/userService";
import { useState } from "react";
import { Alert } from "../../components/ui/Alert";
import { TOAST_MESSAGES } from "../../constants/toastMessages";
import { useToast } from "../../hooks/useToast";
import { userFields } from "../../constants/forms/userFields";

const userAvatarFormFields: FieldConfig[] = [userFields.avatar];

export function UserAvatarForm() {
  const { launchToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = (data: UserUpdateAvatarPayload) => {
    return userService
      .updateAvatar(data)
      .then(() => {
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
    fields: userAvatarFormFields,
    onSubmit,
  });
  return (
    <>
      <SmartForm submitText="Save changes" formState={formState} />
      {error && <Alert color="error">{error}</Alert>}
    </>
  );
}
