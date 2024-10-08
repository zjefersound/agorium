import { useNavigate } from "react-router-dom";
import { FieldConfig } from "../../components/form/SmartField/types";
import { SmartForm } from "../../components/form/SmartForm";
import { useSmartForm } from "../../components/form/SmartForm/hooks/useSmartForm";
import { userService, UserUpdateInfoPayload } from "../../services/userService";
import { useMemo, useState } from "react";
import { Alert } from "../../components/ui/Alert";
import { TOAST_MESSAGES } from "../../constants/toastMessages";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import { userFields } from "../../constants/forms/userFields";
import { FormErrors } from "../../models/IValidationReturn";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const userInfoFormFields: FieldConfig[] = [
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
  const [error, setError] = useState<FormErrors>({});
  const onSubmit = (data: UserUpdateInfoPayload) => {
    return userService
      .updateInfo(data)
      .then((res) => {
        setUser(res.data);
        navigate("/profile");
        launchToast({
          title: TOAST_MESSAGES.UserInfo.createdTitle,
          description: TOAST_MESSAGES.UserInfo.createdDescription,
        });
      })
      .catch((error) => {
        setError(
          typeof error.response?.data.error === "string"
            ? { message: getApiErrorMessage(error) }
            : error.response?.data.error,
        );
      });
  };
  const formState = useSmartForm({
    dataValue,
    fields: userInfoFormFields,
    onSubmit,
  });
  const formStateWithErrors = useMemo(
    () => ({
      ...formState,
      errors: { ...formState.errors, ...error },
    }),
    [formState, error],
  );
  return (
    <>
      <SmartForm
        submitText="Save information"
        formState={formStateWithErrors}
      />
      {error?.message && (
        <Alert color="error" className="mt-6">
          {error.message}
        </Alert>
      )}
    </>
  );
}
