import { useNavigate } from "react-router-dom";
import { FieldConfig } from "../components/form/SmartField/types";
import { SmartForm } from "../components/form/SmartForm";
import { useSmartForm } from "../components/form/SmartForm/hooks/useSmartForm";
import { userService, UserSignupPayload } from "../services/userService";
import { useMemo, useState } from "react";
import { Alert } from "../components/ui/Alert";
import { TOAST_MESSAGES } from "../constants/toastMessages";
import { useToast } from "../hooks/useToast";
import { userFields } from "../constants/forms/userFields";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { FormErrors } from "../models/IValidationReturn";

const signupFormFields: FieldConfig[] = [
  userFields.fullName,
  userFields.username,
  userFields.email,
  userFields.password,
  userFields.confirmPassword,
  userFields.avatar,
];

export function SignupForm() {
  const { launchToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState<FormErrors>({});
  const onSubmit = (data: UserSignupPayload) => {
    return userService
      .signup(data)
      .then(() => {
        navigate("/login");
        launchToast({
          title: TOAST_MESSAGES.Signup.createdTitle,
          description: TOAST_MESSAGES.Signup.createdDescription,
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
    fields: signupFormFields,
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
      <SmartForm submitText="Create account" formState={formStateWithErrors} />
      {error?.message && <Alert color="error">{error.message}</Alert>}
    </>
  );
}
