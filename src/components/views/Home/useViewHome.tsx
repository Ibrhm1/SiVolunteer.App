import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewHome = () => {
  const { isReady } = useRouter();

  const { data: dataEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["Events", isReady],
    queryFn: async () => {
      const { data } = await eventsService.getEvents(
        `limit=4&page=1&isPublish=true`,
      );
      return data.data;
    },
    enabled: !!isReady,
  });

  return {
    dataEvents,
    isLoadingEvents,
  };
};

export default useViewHome;
