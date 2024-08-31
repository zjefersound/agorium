import { useMemo } from "react";
import { FieldConfig } from "../../SmartField/types";
import { getInitialFormState } from "../utils/getInitialFormState";
import { getValidator } from "../utils/getValidator";
import { useForm, UseFormReturn } from "./useForm";
import { FormFields } from "../types";

export interface UseSmartFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataValue?: any;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (payload: FormFields | any) => Promise<unknown>;
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
  dataValue,
  onSubmit,
  fields,
  loading: formLoading,
}: UseSmartFormProps) {
  const initialState = getInitialFormState(fields);
  const { data, setData, errors, loading, handleChangeValue, handleSubmit } =
    useForm<FormFields>({
      dataValue,
      initialState,
      onSubmit,
      validator: getValidator(fields),
    });

  const disabled = useMemo(
    () => formLoading || loading,
    [formLoading, loading],
  );
  const serializedFields = useMemo(
    () => fields.map((config) => ({ ...config, required: false })),
    [fields],
  );

  return {
    data: data as T,
    setData: setData as (newData: T) => void,
    errors,
    loading,
    handleChangeValue,
    handleSubmit,
    disabled,
    serializedFields,
  } as UseSmartFormReturn<T>;
}
