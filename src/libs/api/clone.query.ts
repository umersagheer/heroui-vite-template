// src/hooks/useCreateClone.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { cloneService } from "@/services/clone.service";
import { CreateCloneInput } from "@/libs/schemas/clone";
import { ClonesResponse } from "@/types/clone.type";

export const useCreateClone = () => {
  return useMutation({
    mutationFn: (data: CreateCloneInput) => cloneService.createClone(data),
  });
};

export const useClonesQuery = () => {
  return useQuery<ClonesResponse>({
    queryKey: ["clones"],
    queryFn: () => cloneService.getClones(),
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

export const useCloneQuery = (cloneId: string) => {
  return useQuery({
    queryKey: ["clone", cloneId],
    queryFn: () => cloneService.getClone(cloneId),
    refetchOnWindowFocus: false,
  });
};
