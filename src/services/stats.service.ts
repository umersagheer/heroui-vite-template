// query to fetch stats

import apiClient from "@/libs/axios/interceptor";

export const statsService = {
  async getStats() {
    const response = await apiClient.get("/stats");
    return response.data;
  },
};
