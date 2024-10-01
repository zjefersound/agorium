import axios from "axios";

export const BASE_URL = process.env.NODE_ENV === "production" 
  ? "https://agorium-alb-922956380.us-east-2.elb.amazonaws.com/" 
  : "http://localhost/api";

export const api = axios.create({
  baseURL: BASE_URL,
});