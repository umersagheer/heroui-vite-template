import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

export function CloneCardSkeleton() {
  return (
    <Card className="p-4">
      <CardBody className="overflow-visible p-0">
        <div className="flex gap-4 items-start">
          {/* Avatar skeleton */}
          <Skeleton className="w-10 h-10 rounded-full" />

          {/* Text skeletons */}
          <div className="flex flex-col gap-2 flex-grow">
            <Skeleton className="h-3 w-32 rounded-md" /> {/* Name */}
            <Skeleton className="h-3 w-40 rounded-md" /> {/* Description */}
            <Skeleton className="h-2 w-24 rounded-md" />{" "}
            {/* Last interaction */}
          </div>
        </div>
      </CardBody>

      <CardFooter className="px-0 pt-4 pb-0">
        <div className="flex justify-between w-full items-center">
          {/* Buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>

          {/* Dropdown icon */}
          <Skeleton className="h-2 w-8 rounded-xl" />
        </div>
      </CardFooter>
    </Card>
  );
}
