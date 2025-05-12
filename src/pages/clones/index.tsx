import { CloneCard } from "@/components/clone-card";
import { CloneCardSkeleton } from "@/components/clone-card-skeleton";
import { useClonesQuery } from "@/libs/api/clone.query";

export default function CloneListPage() {
  const { data: clones, isPending: pendingClones } = useClonesQuery();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold self-start">Your Clones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingClones
          ? Array.from({ length: 3 }).map((_, i) => (
              <CloneCardSkeleton key={i} />
            ))
          : clones?.map((clone) => <CloneCard key={clone.id} clone={clone} />)}
      </div>
    </div>
  );
}
