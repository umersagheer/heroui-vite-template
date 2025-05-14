import { Spinner } from "@heroui/react";

export function TypingIndicator({ cloneName }: { cloneName: string }) {
  return (
    <div className="flex items-center gap-2 text-default-400 text-small px-4 py-2">
      <span>{cloneName} is typing</span>
      <Spinner size="sm" color="default" variant="dots" />
    </div>
  );
}
