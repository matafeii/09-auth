import axios, { type AxiosResponse } from "axios";
import { cookies } from "next/headers";
import type { NewNoteData, Note } from "../../types/note";
import type { User } from "../../types/user";
import type {
  FetchNotesParams,
  FetchNotesResponse,
  SessionResponse,
} from "./clientApi";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const serverApi = axios.create({
  baseURL,
  withCredentials: true,
});

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await serverApi.get(
    "/notes",
    {
      params: {
        page: params.page,
        perPage: params.perPage ?? 12,
        search: params.search,
        tag: params.tag,
      },
      headers: {
        Cookie: await getCookieHeader(),
      },
    },
  );

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await serverApi.get(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response: AxiosResponse<User> = await serverApi.get("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data;
};

export const checkSession = async (): Promise<SessionResponse> => {
  const response: AxiosResponse<SessionResponse> = await serverApi.get(
    "/auth/session",
    {
      headers: {
        Cookie: await getCookieHeader(),
      },
    },
  );

  return response.data;
};

export type CreateNoteParams = NewNoteData;
