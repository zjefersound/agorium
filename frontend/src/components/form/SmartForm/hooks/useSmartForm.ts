import { useMemo } from "react";
import { FieldConfig } from "../../SmartField/types";
import { getInitialFormState } from "../utils/getInitialFormState";
import { getValidator } from "../utils/getValidator";
import { useForm, UseFormReturn } from "./useForm";
import { FormFields } from "../types";

export interface UseSmartFormProps {
  loading?: boolean;
  onSubmit: (payload: FormFields) => Promise<unknown>;
  fields: FieldConfig[];
}

export interface UseSmartFormReturn<T> extends UseFormReturn<T> {
  disabled: boolean;
  serializedFields: FieldConfig[];
}

/**
 * Wrapper of useForm to fit SmartForm requirements
 */
export function useSmartForm<T = FormFields>({
  onSubmit,
  fields,
  loading: formLoading,
}: UseSmartFormProps) {
  const initialState = getInitialFormState(fields);
  const { data, errors, loading, handleChangeValue, handleSubmit } =
    useForm<FormFields>({
      initialState,
      onSubmit,
      validator: getValidator(fields),
    });

  const disabled = useMemo(
    () => formLoading || loading,
    [formLoading, loading]
  );
  const serializedFields = useMemo(
    () => fields.map((config) => ({ ...config, required: false })),
    [fields]
  );

  return {
    data: data as T,
    errors,
    loading,
    handleChangeValue,
    handleSubmit,
    disabled,
    serializedFields,
  } as UseSmartFormReturn<T>;
}
