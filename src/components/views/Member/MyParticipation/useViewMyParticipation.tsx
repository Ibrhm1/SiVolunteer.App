import useChangeUrl from "@/hooks/useChangeUrl";
import eventsService from "@/services/events.service";
import eventVolunteerService from "@/services/eventVolunteer.service";
import { IEventVolunteer } from "@/types/EventVolunteer";
import { useQuery } from "@tanstack/react-query";

const useViewMyParticipation = () => {
  const { currentLimit, currentPage } = useChangeUrl();

  const getEventVolunteerByMember = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}`;
    const result =
      await eventVolunteerService.getEventVolunteerByMember(params);
    return result.data;
  };

  const { data: dataEventVolunteer, isLoading: isLoadingEventVolunteer } =
    useQuery({
      queryKey: ["EventVolunteer", currentPage, currentLimit],
      queryFn: getEventVolunteerByMember,
      enabled: !!currentPage && !!currentLimit,
    });

  const { data: dataCombined, isLoading: isLoadingCombined } = useQuery({
    queryKey: ["CombinedEventVolunteer"],
    queryFn: async () => {
      const volunteers = dataEventVolunteer?.data || [];

      const eventsPromise = Promise.all(
        volunteers.map((item: IEventVolunteer) =>
          eventsService
            .getEventById(`${item.eventId}`)
            .then((res) => res.data.data.name),
        ),
      );

      const [events] = await Promise.all([eventsPromise]);

      // Gabungkan data
      const combined = volunteers.map(
        (item: IEventVolunteer, index: number) => ({
          ...item,
          eventName: events[index],
        }),
      );

      return combined;
    },
    enabled: !!dataEventVolunteer?.data?.length,
  });

  return {
    dataEventVolunteer,
    isLoadingEventVolunteer,

    dataCombined,
    isLoadingCombined,
  };
};

export default useViewMyParticipation;
