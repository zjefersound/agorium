import { UploadedFile } from "../components/form/FileInput";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";
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

export type UserUpdateInfoPayload = {
  email: string;
  username: string;
  fullName: string;
};
function updateInfo(payload: UserUpdateInfoPayload) {
  return api.put<User>("/user/me/info", payload);
}

export type UserUpdateAvatarPayload = {
  avatar: UploadedFile;
};
async function updateAvatar(data: UserUpdateAvatarPayload) {
  const formData = new FormData();

  const avatarBlob = await dataURLtoBlob(data.avatar.dataURL);
  if (!avatarBlob) {
    throw new Error("Couldn't parse image");
  }
  formData.append("avatar", avatarBlob, data.avatar.name);

  return api.post<User>("/user/me/avatar", formData);
}

export type UserUpdatePasswordPayload = {
  currentPassword: string;
  password: string;
};
function updatePassword(payload: UserUpdatePasswordPayload) {
  return api.put("/user/me/password", payload);
}

export type UserOverviewResponse = {
  user: User;
  rankingPosition: number;
  totalPosts: number;
  totalComments: number;
  totalUpvotes: number;
};
function getOverviewById(id: number | string) {
  return api.get<UserOverviewResponse>(`/user/overview/${id}`);
}

export type RankedUser = {
  userId: number;
  user: User;
  totalUpvotes: number;
  totalPosts: number;
  totalComments: number;
  position: number;
};
function getRanking(options?: ISearchableOptions) {
  return api.get<IPaginatedResponse<RankedUser>>(`/user/ranking`, {
    params: options,
  });
}

export const userService = {
  getOverviewById,
  getRanking,
  login,
  me,
  signup,
  updateAvatar,
  updateInfo,
  updatePassword,
};
