import { api } from "./api";
import type { User } from "../../types/user";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

export const register = async (credentials: RegisterRequest) => {
  const response = await api.post<AuthResponse>("/auth/register", credentials);
  return response.data;
};

export const login = async (credentials: LoginRequest) => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const response = await api.get("/auth/session");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const updateMe = async (data: { username?: string }) => {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
};

