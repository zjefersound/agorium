import { memo } from "react";
import { ISelectOption } from "../../../models/ISelectOption";
import { Button } from "../../ui/Button";
import { Loading } from "../../ui/Loading";
import { SmartField } from "../SmartField";
import { FormFields } from "../SmartForm/types";
import { UseSmartFormReturn } from "./hooks/useSmartForm";

export interface SmartFormProps {
  submitText: string;
  formOptions?: { [key: string]: ISelectOption[] };
  formState: UseSmartFormReturn<FormFields>;
}

const MemoizedSmartField = memo(SmartField);
export function SmartForm({
  submitText,
  formOptions = {},
  formState,
}: SmartFormProps) {
  const {
    data,
    errors,
    loading,
    handleChangeValue,
    handleSubmit,
    serializedFields,
    disabled,
  } = formState;
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {serializedFields.map((field) => (
        <MemoizedSmartField
          key={field.id}
          error={errors[field.id]}
          onChangeValue={handleChangeValue}
          value={data[field.id]}
          disabled={disabled}
          options={formOptions[field.id]}
          config={field}
        />
      ))}
      <Button className="w-full justify-center" disabled={disabled}>
        {loading && <Loading size="sm" className="mr-2" />}
        {submitText}
      </Button>
    </form>
  );
}
