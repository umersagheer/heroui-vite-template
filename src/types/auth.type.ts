import { User } from "@/types";

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
};

export type RegisterResponse = {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
};
