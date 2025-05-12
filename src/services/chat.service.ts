import apiClient from "@/libs/axios/interceptor";

export const sendChatMessage = async ({
  cloneId,
  message,
}: {
  cloneId: string;
  message: string;
}) => {
  const res = await apiClient.post(`/chats/${cloneId}`, { message });
  return res.data.answer;
};

export const fetchChatHistory = async (cloneId: string) => {
  const res = await apiClient.get(`/chats/${cloneId}`);
  return res.data.chats;
};
