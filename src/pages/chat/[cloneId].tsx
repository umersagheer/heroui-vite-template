import { ChatWindow } from "@/components/chat-window";
import { useCloneQuery } from "@/libs/api/clone.query";
import { Skeleton } from "@heroui/react";
import Avatar from "boring-avatars";
import { useParams } from "react-router-dom";

export default function CloneChatPage() {
  const { cloneId } = useParams();

  const { data: clone, isPending } = useCloneQuery(cloneId!);

  const ChatHeaderSkeleton = () => {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-1/3 rounded-lg" /> {/* Title Skeleton */}
      </div>
    );
  };
  return (
    <div className="flex-col flex gap-3">
      {isPending ? (
        <ChatHeaderSkeleton />
      ) : (
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl font-bold self-start">{clone?.name}</h2>
            <Avatar
              name={clone?.name}
              size={30}
              variant="marble"
              colors={["#7828c8", "#006FEE", "#f31260", "#f5a524"]}
            />
          </div>
        </div>
      )}

      <ChatWindow clone={clone} />
    </div>
  );
}
