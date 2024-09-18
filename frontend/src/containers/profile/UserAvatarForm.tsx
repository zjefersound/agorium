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
import { useAuth } from "../../hooks/useAuth";

const userAvatarFormFields: FieldConfig[] = [
  { ...userFields.avatar, required: true },
];

export function UserAvatarForm() {
  const { setUser } = useAuth();
  const { launchToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = (data: UserUpdateAvatarPayload) => {
    return userService
      .updateAvatar(data)
      .then((res) => {
        setUser(res.data);
        navigate("/profile");
        launchToast({
          title: TOAST_MESSAGES.UserAvatar.createdTitle,
          description: TOAST_MESSAGES.UserAvatar.createdDescription,
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
      {error && (
        <Alert color="error" className="mt-6">
          {error}
        </Alert>
      )}
    </>
  );
}
