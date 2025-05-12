import apiClient from "@/libs/axios/interceptor";
import { CreateCloneInput } from "@/libs/schemas/clone";

export const cloneService = {
  async createClone(cloneData: CreateCloneInput) {
    const response = await apiClient.post("/clones", cloneData);
    return response.data;
  },

  async processClone(cloneId: string) {
    const response = await apiClient.post(`/clones/${cloneId}/process`);
    return response.data;
  },

  async getClone(cloneId: string) {
    const response = await apiClient.get(`/clones/${cloneId}`);
    return response.data;
  },

  async getClones() {
    const response = await apiClient.get("/clones");
    return response.data;
  },
};
