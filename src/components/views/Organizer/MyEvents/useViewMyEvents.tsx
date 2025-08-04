import useChangeUrl from "@/hooks/useChangeUrl";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useViewMyEvents = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();

  const getEventByOrganizer = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const { data } = await eventsService.getEventByOrganizer(params);
    return data.data;
  };

  const {
    data: dataMyEvents,
    isPending: isPendingMyEvents,
    refetch: refetchMyEvents,
  } = useQuery({
    queryKey: ["MyEvents", currentPage, currentLimit, currentSearch],
    queryFn: getEventByOrganizer,
    enabled: !!currentPage && !!currentLimit,
  });

  return {
    selectedId,
    setSelectedId,
    dataMyEvents,
    isPendingMyEvents,
    refetchMyEvents,
  };
};

export default useViewMyEvents;
