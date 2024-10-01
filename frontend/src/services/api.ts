import axios from "axios";

export const BASE_URL = process.env.NODE_ENV === "production" 
  ? "http://3.144.107.244" 
  : "http://localhost/api";

export const api = axios.create({
  baseURL: BASE_URL,
});