import { CloneCard } from "@/components/clone-card";
import { CloneCardSkeleton } from "@/components/clone-card-skeleton";
import { useClonesQuery } from "@/libs/api/clone.query";
import { useStatsQuery } from "@/libs/api/stats.query";
import { useIllustration } from "@/libs/hooks/useIllustration";
import { useAuthStore } from "@/store/useAuthStore";
import { Button, Card, CardBody, Progress, Skeleton } from "@heroui/react";
import { ChatText, Coins, Plus, Users } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: statsData, isPending: pendingStats } = useStatsQuery();
  const { data: clones, isPending: pendingClones } = useClonesQuery();
  const stats = statsData?.stats;

  const notFound = useIllustration("not-found");

  const quickStats = [
    {
      label: "Total Clones",
      value: stats?.totalClones,
      icon: <Users size={20} />,
      progress: stats?.usage.cloneProgress || 0,
    },
    {
      label: "Active Conversations",
      value: stats?.totalChats,
      icon: <ChatText size={20} />,
      progress: stats?.usage.chatProgress || 0,
    },
    {
      label: "Remaining Credits",
      value: stats?.remainingCredits || "-",
      icon: <Coins size={20} />,
      progress: stats?.usage.creditProgress || 0,
    },
  ];

  const statsToRender = pendingStats
    ? Array.from({ length: 3 }).map(() => null)
    : quickStats;

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-6">
        Welcome back, {user?.firstName}!
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {statsToRender.map((stat, i) => (
          <Card key={i} className="p-4">
            <CardBody className="flex gap-4 items-start">
              {pendingStats || !stat ? (
                <>
                  <Skeleton className="rounded-lg w-10 h-10" />
                  <div className="flex-grow w-full">
                    <Skeleton className="h-3 w-24 rounded-lg mb-2" />
                    <Skeleton className="h-5 w-32 rounded-lg mb-2" />
                    <Skeleton className="h-2 w-full rounded-lg mt-2" />
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="text-small text-default-500">{stat.label}</p>
                    <h3 className="text-xl font-semibold">{stat.value}</h3>
                    <Progress
                      aria-label={`${stat.label} progress`}
                      value={stat.progress}
                      size="sm"
                      className="mt-2"
                    />
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
      {/* No Clones Message */}
      {stats?.totalClones === 0 && (
        <Card className="my-8">
          <CardBody>
            <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
            <p className="text-default-500">
              Welcome to CloneVerse! Create your first AI clone by clicking the
              "Create Clone" button in the sidebar. Need help? Check out our
              quick-start guide or contact support.
            </p>
          </CardBody>
        </Card>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Clones</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {pendingClones ? (
            Array.from({ length: 3 }).map((_, i) => (
              <CloneCardSkeleton key={i} />
            ))
          ) : clones?.length ? (
            clones.map((clone) => <CloneCard key={clone.id} clone={clone} />)
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 col-span-3">
              <img
                src={notFound}
                alt="No clones found"
                className="size-44 object-cover mb-2 rounded-lg"
              />
              <p>No clones created yet.</p>
              <Button
                startContent={<Plus />}
                color="primary"
                onPress={() => navigate(`/u/${user?.id}/clones/create`)}
              >
                Create one
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
