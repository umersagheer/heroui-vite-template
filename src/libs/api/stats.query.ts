import { statsService } from "@/services/stats.service";
import { StatsResponse } from "@/types/stats.type";
import { useQuery } from "@tanstack/react-query";

export const useStatsQuery = () => {
  return useQuery<StatsResponse>({
    queryKey: ["stats"],
    queryFn: () => statsService.getStats(),
    refetchOnWindowFocus: false,
  });
};
