import { FieldConfig } from "../../SmartField/types";
import { FormFields } from "../types";

export function getInitialFormState(fields: FieldConfig[]) {
  const initialFormState = fields.reduce((state, field) => {
    if (field.type === "checkboxList" || field.type === "files") {
      state[field.id] = [];
    } else if (field.type === "range") {
      state[field.id] = [0, 0];
    } else if (field.type === "file") {
      state[field.id] = null;
    } else if (field.type === "checkbox") {
      state[field.id] = false;
    } else if (field.type === "currency") {
      state[field.id] = 0;
    } else if (field.type === "slider") {
      state[field.id] = 0;
    } else if (field.type === "color") {
      state[field.id] = "#000000";
    } else {
      state[field.id] = "";
    }
    return state;
  }, {} as FormFields);

  return initialFormState;
}
