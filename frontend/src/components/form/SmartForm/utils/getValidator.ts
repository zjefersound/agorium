import { FormErrors } from "../../../../models/IValidationReturn";
import { FieldConfig } from "../../SmartField/types";
import { FormFields } from "../types";
import { validateField } from "./validateField";

export function getValidator(fields: FieldConfig[]) {
  return (values: FormFields) => {
    const newErrors = fields.reduce((errorsObj, field) => {
      const errorMessage = validateField(field, values[field.id]);
      if (errorMessage) {
        errorsObj[field.id] = errorMessage;
      }
      return errorsObj;
    }, {} as FormErrors);
    return { isValid: !Object.values(newErrors).length, errors: newErrors };
  };
}
