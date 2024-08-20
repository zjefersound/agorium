import {
  FormErrors,
  IValidationReturn,
} from "../../../../models/IValidationReturn";
import { FormEvent, useCallback, useState } from "react";
import { FormFields, FormValue } from "../../SmartForm/types";

interface Props {
  initialState: FormFields;
  dataValue?: FormFields;
  onSubmit: (data: FormFields) => Promise<unknown>;
  validator: (data: FormFields) => IValidationReturn;
}

export interface UseFormReturn<T> {
  data: T;
  setData: (data: T) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleChangeValue: (value: FormValue, id: string) => void;
  handleSubmit: (e?: FormEvent) => void;
  errors: FormErrors<T>;
  setErrors: (errors: FormErrors) => void;
}
export function useForm<T = unknown>({
  initialState,
  dataValue,
  onSubmit,
  validator,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dataValue || initialState);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChangeValue = useCallback((value: FormValue, id: string) => {
    setData((d: FormFields) => ({ ...d, [id]: value }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[id as keyof T];
      return newErrors;
    });
  }, []);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const { isValid, errors: newErrors } = validator(data);

    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
    } else {
      setErrors({});
      onSubmit(data).finally(() => {
        setLoading(false);
      });
    }
  };

  return {
    data: data as T,
    setData,
    loading,
    setLoading,
    handleChangeValue,
    handleSubmit,
    errors,
    setErrors,
  } as UseFormReturn<T>;
}
