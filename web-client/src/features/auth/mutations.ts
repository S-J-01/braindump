import { useMutation } from "@tanstack/react-query";
import { loginUser, logoutUser, signupUser } from "./api";

export const useSignup = () => {
  return useMutation({
    mutationFn: signupUser,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
