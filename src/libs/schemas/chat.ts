// types/chat.type.ts
import { z } from "zod";

export const ChatMessageSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  role: z.enum(["USER", "CLONE"]),
  cloneId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(), // or z.coerce.date() if converting to Date
  updatedAt: z.string(),
});

export const ChatMessagesSchema = z.array(ChatMessageSchema);

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
