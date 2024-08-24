import { FieldConfig } from "../../SmartField/types";
import { FormFields, FormValue } from "../types";

export const validateField = (
  field: FieldConfig,
  value: FormValue,
  values: FormFields,
): string | null => {
  if (field.required && !value && value !== 0) {
    return `${field.label} is required`;
  }
  if (field.validations) {
    for (const validation of field.validations) {
      if (!validation.rule(value, values)) {
        return validation.message;
      }
    }
  }
  return null;
};
