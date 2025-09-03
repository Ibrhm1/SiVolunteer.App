import regionService from "@/services/region.service";
import { useQuery } from "@tanstack/react-query";

const useEventCard = (regionId: string) => {
  return useQuery({
    queryKey: ["Region", regionId],
    queryFn: async () => {
      const { data } = await regionService.getRegencyById(regionId);
      return data.data;
    },
    enabled: !!regionId,
  });
};

export default useEventCard;
