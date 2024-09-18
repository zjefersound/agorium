import { AxiosError } from "axios";
import { IApiErrorResponse } from "../models/IApiErrorResponse";

export function getApiErrorMessage(error: AxiosError<IApiErrorResponse>) {
  return typeof error.response?.data.error === "string"
    ? error.response.data.error
    : "";
}
