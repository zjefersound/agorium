import { UploadedFile } from "../components/form/FileInput";
import { User } from "../models/User";
import { dataURLtoBlob } from "../utils/dataURLToBlob";
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

export type UserSignupPayload = {
  email: string;
  username: string;
  fullName: string;
  password: string;
  avatar?: UploadedFile;
};
async function signup(data: UserSignupPayload) {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("username", data.username);
  formData.append("fullName", data.fullName);
  formData.append("password", data.password);
  if (data.avatar) {
    const avatarBlob = await dataURLtoBlob(data.avatar.dataURL);
    if (!avatarBlob) return;
    formData.append("avatar", avatarBlob, data.avatar.name);
  }

  return api.post("/signup", formData);
}

function me() {
  return api.get<User>("/user/me");
}
export const userService = {
  login,
  signup,
  me,
};
