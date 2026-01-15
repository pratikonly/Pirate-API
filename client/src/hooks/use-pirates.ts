import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function usePirates() {
  return useQuery({
    queryKey: [api.pirates.list.path],
    queryFn: async () => {
      const res = await fetch(api.pirates.list.path);
      if (!res.ok) throw new Error("Failed to fetch crew list");
      return api.pirates.list.responses[200].parse(await res.json());
    },
  });
}

export function useRandomPirate() {
  return useQuery({
    queryKey: [api.pirates.random.path],
    queryFn: async () => {
      const res = await fetch(api.pirates.random.path);
      if (!res.ok) throw new Error("Failed to fetch random pirate");
      return api.pirates.random.responses[200].parse(await res.json());
    },
    // Don't refetch automatically, we want the button to trigger it via invalidate or new key if needed
    // But for a simple "get random" component, usually we just want to fetch on mount or explicit action
    staleTime: 0, 
  });
}
