import { User } from "../models/User";
import { api } from "./api";

export type UserLoginPayload = {
  login: string;
  password: string;
};
interface ILoginResponse {
  token: string;
}
function login(data: UserLoginPayload) {
  return api.post<ILoginResponse>("/login", data);
}

function me() {
  return api.get<User>("/users/me");
}
export const userService = {
  login,
  me,
};
