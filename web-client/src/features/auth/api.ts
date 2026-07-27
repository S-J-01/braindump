import axios from "axios";
import { apiClient } from "../../lib/api";
import type {
  AuthUserResponse,
  CurrentUserResponse,
  LogoutResponse,
} from "./types";
import type { SignUpInput, LogInInput } from "@braindump/shared";

export const getCurrentUser = async (): Promise<CurrentUserResponse | null> => {
  try {
    const response = await apiClient.get("/auth/me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const signupUser = async (
  input: SignUpInput,
): Promise<AuthUserResponse> => {
  const response = await apiClient.post("/auth/signup", input);
  return response.data;
};

export const loginUser = async (
  input: LogInInput,
): Promise<AuthUserResponse> => {
  const response = await apiClient.post("/auth/login", input);
  return response.data;
};

export const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};
