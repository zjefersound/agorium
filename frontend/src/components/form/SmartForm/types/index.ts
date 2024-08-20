import { UploadedFile } from "../../FileInput";

export type FormValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | null
  | UploadedFile
  | UploadedFile[];

export interface FormFields {
  [key: string]: FormValue;
}
