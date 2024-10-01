import axios from "axios";

export const BASE_URL = process.env.NODE_ENV === "production" 
  ? "https://agorium.vercel.app/api" 
  : "http://localhost/api";

export const api = axios.create({
  baseURL: BASE_URL,
});