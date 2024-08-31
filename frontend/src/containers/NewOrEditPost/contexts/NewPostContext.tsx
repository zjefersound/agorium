import { createContext, FormEvent, useCallback, useMemo } from "react";
import { useSmartForm } from "../../../components/form/SmartForm/hooks/useSmartForm";
import { postFields } from "../constants/postFields";
import {
  FormFields,
  FormValue,
} from "../../../components/form/SmartForm/types";
import { FormErrors } from "../../../models/IValidationReturn";
import { FieldConfig } from "../../../components/form/SmartField/types";

interface NewPostProviderProps {
  children: React.ReactNode;
}

export interface NewPostContextType {
  data: FormFields;
  handleChangeValue: (value: FormValue, id: string) => void;
  disabled: boolean;
  errors: FormErrors;
  handleSubmit: (e?: FormEvent) => void;
  loading: boolean;
  visibleFields: FieldConfig[];
  handleChangeContent: (value: string) => void;
}

export const NewPostContext = createContext<NewPostContextType>(
  {} as NewPostContextType,
);

export const NewPostProvider = ({ children }: NewPostProviderProps) => {
  const {
    data,
    handleChangeValue,
    disabled,
    errors,
    serializedFields,
    handleSubmit,
    loading,
  } = useSmartForm({
    fields: postFields,
    onSubmit: async (data) => {
      console.log(data);
    },
  });

  const handleChangeContent = useCallback((text: string) => {
    handleChangeValue(text, "content");
  }, []);

  const visibleFields = useMemo(
    () => serializedFields.filter((field) => field.id !== "content"),
    [],
  );

  const values = useMemo(
    () => ({
      data,
      handleChangeValue,
      disabled,
      errors,
      handleSubmit,
      loading,
      visibleFields,
      handleChangeContent,
    }),
    [data, visibleFields],
  );

  return (
    <NewPostContext.Provider value={values}>{children}</NewPostContext.Provider>
  );
};
