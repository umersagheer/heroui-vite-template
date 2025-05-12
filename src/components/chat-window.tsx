import React, { useEffect, useRef } from "react";
import { Button, ScrollShadow, Skeleton, Input } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useChatHistoryQuery, useChatMutation } from "@/libs/api/chat.query";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { ChatMessage } from "@/types/chat.type";
import { CloneItem } from "@/types/clone.type";

type Props = {
  clone: CloneItem;
};

type UIMessage = {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "assistant";
};

type FormInput = {
  message: string;
};

export function ChatWindow({ clone }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState<UIMessage[]>([]);
  const { control, handleSubmit, setValue, watch } = useForm<FormInput>({
    defaultValues: { message: "" },
  });

  const messageValue = watch("message");

  const { data: chatHistory, isLoading: isHistoryLoading } =
    useChatHistoryQuery(clone?.id);
  const { mutateAsync: sendMessage, isPending: isSending } = useChatMutation();

  useEffect(() => {
    if (chatHistory) {
      const formatted: UIMessage[] = chatHistory.map((msg: ChatMessage) => ({
        id: msg.id,
        content: msg.content,
        timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: msg.role === "USER" ? "user" : "assistant",
      }));
      setMessages(formatted);
    }
  }, [chatHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data: FormInput) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: UIMessage = {
      id: now.getTime().toString(),
      content: data.message.trim(),
      timestamp,
      sender: "user",
    };

    // 1️⃣ Immediately show user's message
    setMessages((prev) => [...prev, userMessage]);
    setValue("message", "");

    try {
      const reply = await sendMessage({
        cloneId: clone?.id,
        message: data.message,
      });

      const assistantMessage: UIMessage = {
        id: `${Date.now()}-ai`,
        content: reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "assistant",
      };

      // 2️⃣ Append assistant's response
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isSending) return;
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] rounded-lg shadow-sm">
      <ScrollShadow className="flex-1 p-4 space-y-4 overflow-y-auto">
        {isHistoryLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="rounded-full w-8 h-8" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              assistantName={clone?.name}
              key={message.id}
              content={message.content}
              timestamp={message.timestamp}
              sender={message.sender}
            />
          ))
        )}
        {isSending && <TypingIndicator cloneName={clone?.name} />}
        <div ref={messagesEndRef} />
      </ScrollShadow>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border-t border-divider"
      >
        <div className="flex gap-2 items-center justify-center">
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Input
                size="lg"
                {...field}
                onKeyDown={(e) => handleKeyPress(e)}
                placeholder="Type your message..."
                className="flex-1"
                classNames={{ input: "resize-none" }}
              />
            )}
          />
          <Button
            isIconOnly
            color="primary"
            type="submit"
            isDisabled={!messageValue.trim() || isSending}
          >
            <PaperPlaneTilt size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
}
