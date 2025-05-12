import Avatar from "boring-avatars";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  sender: "user" | "assistant";
  assistantName?: string;
}

export function MessageBubble({
  content,
  timestamp,
  sender,
  assistantName,
}: MessageBubbleProps) {
  const isAssistant = sender === "assistant";

  return (
    <div className={`flex gap-3 ${isAssistant ? "" : "flex-row-reverse"}`}>
      {isAssistant && (
        <Avatar
          name={assistantName || "AI Assistant"}
          size={32}
          variant="marble"
          colors={["#7828c8", "#006FEE", "#f31260", "#f5a524"]}
        />
      )}
      {isAssistant && <div className="w-8" />}
      {!isAssistant && <div className="w-8" />}

      <div
        className={`flex flex-col max-w-[85%] md:max-w-[70%] ${
          isAssistant ? "" : "items-end"
        }`}
      >
        {isAssistant && (
          <span className="text-small text-default-500 mb-1">
            {assistantName || "AI Assistant"}
          </span>
        )}
        <div
          className={`rounded-lg px-4 py-2 ${
            isAssistant
              ? "bg-content2 text-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        <span className="text-tiny text-default-400 mt-1">{timestamp}</span>
      </div>
    </div>
  );
}
