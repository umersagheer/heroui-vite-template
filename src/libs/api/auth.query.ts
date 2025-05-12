import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginSchema, registerSchema } from "../schemas/auth";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginResponse, RegisterResponse } from "@/types/auth.type";

type UserInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

// Custom hook for signup
export const useSignup = () => {
  return useMutation<RegisterResponse, Error, UserInput>({
    mutationFn: authService.signup,
  });
};

// Custom hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: (credentials: LoginInput) => authService.login(credentials),
    onSuccess: () => {
      // Invalidate any auth-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// Custom hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear any cached data
      queryClient.clear();

      // Redirect to login
      navigate("/auth/login");
    },
  });
};

// Custom hook for checking authentication state
export const useAuth = () => {
  const { user, isAuthenticated } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isAdmin: user?.roles?.includes("admin") || false,
  };
};
