import useChangeUrl from "@/hooks/useChangeUrl";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewEvents = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentCategory, currentIsOnline } =
    useChangeUrl();

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
  } = useQuery({
    queryKey: [
      "Events",
      currentPage,
      currentLimit,
      currentCategory,
      currentIsOnline,
    ],
    queryFn: async () => {
      const params = `limit=${currentLimit}&page=${currentPage}&isPublish=true&category=${currentCategory}&isOnline=${currentIsOnline}`;
      const { data } = await eventsService.getEvents(params);
      return data;
    },
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return { dataEvents, isLoadingEvents, isRefetchingEvents };
};

export default useViewEvents;
