export type ChatMessage = {
  id: string;
  content: string;
  role: "USER" | "CLONE";
  cloneId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
