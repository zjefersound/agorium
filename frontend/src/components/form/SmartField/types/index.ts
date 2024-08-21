import { IconType } from "react-icons";
import { ISelectOption } from "../../../../models/ISelectOption";

export type FieldType =
  | "text"
  | "currency"
  | "email"
  | "password"
  | "number"
  | "date"
  | "radio"
  | "checkbox"
  | "select"
  | "textarea"
  | "file"
  | "files"
  | "slider"
  | "range"
  | "color"
  | "time"
  | "tel"
  | "url"
  | "checkboxList";

export type ValidationRule = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rule: (value: any) => boolean;
  message: string;
};

interface BaseFieldConfig {
  label: string;
  type: FieldType;
  id: string;
  options?: ISelectOption[];
  required?: boolean;
  fetchOptionsFromApi?: boolean;
  validations?: ValidationRule[];
  placeholder?: string;
}

interface FieldConfigWithIcon extends BaseFieldConfig {
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "currency"
    | "tel"
    | "url"
    | "time"
    | "date";
  Icon?: IconType;
}

interface FieldConfigCheckbox extends BaseFieldConfig {
  type: "checkbox";
  checkLabel?: string;
}

interface FieldConfigSlider extends BaseFieldConfig {
  type: "slider" | "range";
  orientation?: "vertical" | "horizontal";
  min?: number;
  max?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  inverted?: boolean;
  width?: string;
  height?: string;
}

interface FieldConfigCurrency extends FieldConfigWithIcon {
  type: "currency";
  locale: string;
  currency: string;
}

interface FieldConfigFile extends BaseFieldConfig {
  type: "file" | "files";
  maxFileSize?: number;
  allowedFileTypes?: string[];
  height?: number;
  width?: number;
}

export type FieldConfig =
  | FieldConfigFile
  | FieldConfigSlider
  | FieldConfigCheckbox
  | FieldConfigCurrency
  | FieldConfigWithIcon
  | BaseFieldConfig;

