import { ISelectOption } from "../../../../models/ISelectOption";
import { FormValue } from "../../SmartForm/types";

export interface IFieldHandlersProps {
  value: unknown;
  onChangeValue: (value: FormValue, id: string) => void;
  error?: string;
  disabled?: boolean;
  options?: ISelectOption[];
}
