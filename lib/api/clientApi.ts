import type { AxiosResponse } from "axios";
import type { NewNoteData, Note } from "../../types/note";
import type { User } from "../../types/user";
import { api } from "./api";

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface SessionResponse {
  success: boolean;
}

export type CreateNoteParams = NewNoteData;
export type UpdateUserRequest = Partial<Pick<User, "username">>;

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: {
      page: params.page,
      perPage: params.perPage ?? 12,
      search: params.search,
      tag: params.tag,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
};

export const register = async (data: AuthRequest): Promise<User> => {
  const response: AxiosResponse<User> = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data: AuthRequest): Promise<User> => {
  const response: AxiosResponse<User> = await api.post("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<SessionResponse> => {
  const response: AxiosResponse<SessionResponse> =
    await api.get("/auth/session");
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response: AxiosResponse<User> = await api.get("/users/me");
  return response.data;
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const response: AxiosResponse<User> = await api.patch("/users/me", data);
  return response.data;
};
