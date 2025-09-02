import useChangeUrl from "@/hooks/useChangeUrl";
import eventsService from "@/services/events.service";
import eventVolunteerService from "@/services/eventVolunteer.service";
import { IEventVolunteer } from "@/types/EventVolunteer";
import { useQuery } from "@tanstack/react-query";

const useViewMyParticipation = () => {
  const { currentLimit, currentPage } = useChangeUrl();

  const { data: dataEventVolunteer, isLoading: isLoadingEventVolunteer } =
    useQuery({
      queryKey: ["EventVolunteer", currentPage, currentLimit],
      queryFn: async () => {
        const params = `limit=${currentLimit}&page=${currentPage}`;
        const { data } =
          await eventVolunteerService.getEventVolunteerByMember(params);
        return data;
      },
      enabled: !!currentPage && !!currentLimit,
    });

  return {
    dataEventVolunteer,
    isLoadingEventVolunteer,
  };
};

export default useViewMyParticipation;
