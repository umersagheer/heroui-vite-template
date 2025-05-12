import apiClient from "@/libs/axios/interceptor";
import { loginSchema, registerSchema } from "@/libs/schemas/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { z } from "zod";

type UserInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export const authService = {
  // Sign up method
  async signup(userData: UserInput) {
    const response = await apiClient.post("/auth/signup", userData);

    return response.data;
  },

  // Login method
  async login(credentials: LoginInput) {
    const response = await apiClient.post("/auth/login", credentials);

    return response.data;
  },

  // Logout method
  async logout() {
    try {
      const refreshToken = useAuthStore.getState().refreshToken;

      if (refreshToken) {
        // Revoke the refresh token on the server
        await apiClient.post("/auth/logout", { token: refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear auth state regardless of API response
      useAuthStore.getState().clearAuth();
    }
  },

  // Refresh token method
  async refreshToken(token: string) {
    const response = await apiClient.post("/auth/refresh-token", { token });

    if (response.data && response.data.accessToken) {
      useAuthStore.getState().setAccessToken(response.data.accessToken);
    }

    return response.data;
  },
};
