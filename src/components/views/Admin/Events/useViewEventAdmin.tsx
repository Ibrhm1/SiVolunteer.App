import useChangeUrl from "@/hooks/useChangeUrl";
import organizerServices from "@/services/organizers.service";
import eventsService from "@/services/events.service";
import { IEvent } from "@/types/Event";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

const useViewEventAdmin = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [organizerId, setOrganizerId] = useState<string>("");
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getEvents = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const response = await eventsService.getEvents(params);
    const { data } = response;
    return data;
  };

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: ["Events", currentPage, currentLimit, currentSearch],
    queryFn: () => getEvents(),
    enabled: true,
  });

  useEffect(() => {
    if (dataEvents?.createdBy) {
      setOrganizerId(`${dataEvents?.createdBy}`);
    }
  }, [dataEvents]);

  const getOrganizerById = async () => {
    const { data } = await organizerServices.getOrganizerById(`${organizerId}`);
    return data.data;
  };

  const { data: dataOrganizer } = useQuery({
    queryKey: ["Organizer"],
    queryFn: getOrganizerById,
  });

  const dataEventsWithOrganizer = useMemo(() => {
    if (!dataEvents?.data || !Array.isArray(dataOrganizer)) return [];

    return dataEvents.data.map((event: IEvent) => {
      const organizer = dataOrganizer.find(
        (organizer) => organizer._id === event.createdBy,
      );

      return {
        ...event,
        organizerName: organizer?.organizerName || "Unknown",
      };
    });
  }, [dataEvents, dataOrganizer]);

  return {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,
    dataEventsWithOrganizer,
    dataOrganizer,
    selectedId,
    setSelectedId,
  };
};

export default useViewEventAdmin;
