import { BASE_URL } from "../services/api";

export function getAvatarURL(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  return BASE_URL + url;
}
