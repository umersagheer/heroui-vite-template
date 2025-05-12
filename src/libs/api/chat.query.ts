import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchChatHistory, sendChatMessage } from "@/services/chat.service";
import { ChatMessage } from "@/types/chat.type";

export const useChatHistoryQuery = (cloneId: string) =>
  useQuery<ChatMessage[]>({
    queryKey: ["chat-history", cloneId],
    queryFn: () => fetchChatHistory(cloneId),
  });

export const useChatMutation = () => {
  return useMutation({
    mutationFn: sendChatMessage,
  });
};
