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
import { userFields } from "../../constants/forms/userFields";

const signupFormFields: FieldConfig[] = [
  userFields.fullName,
  userFields.username,
  userFields.email,
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
