import organizerServices from "@/services/organizers.service";
import categoryService from "@/services/category.service";
import eventsService from "@/services/events.service";
import regionService from "@/services/region.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewDetailEvent = () => {
  const { query, isReady } = useRouter();

  const { data: dataEvent, isPending: isPendingDataEvent } = useQuery({
    queryKey: ["Event", query.id],
    queryFn: async () => {
      const { data } = await eventsService.getEventById(`${query.id}`);
      return data.data;
    },
    enabled: isReady && !!query.id,
  });

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion"],
      queryFn: () => regionService.getRegencyById(dataEvent?.location?.region),
      enabled: !!dataEvent?.location?.region,
    });

  return {
    dataEvent,
    dataDefaultRegion,
    isPendingDataEvent,
    isPendingDefaultRegion,
  };
};

export default useViewDetailEvent;
