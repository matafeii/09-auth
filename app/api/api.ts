import axios from "axios";

export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

export const logErrorResponse = (response: unknown) => {
  console.error(response);
};
