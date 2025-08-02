import authService from "@/services/auth.service";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { MdEvent } from "react-icons/md";

const useViewDashboardOrganizer = () => {
  const getProfile = async () => {
    const { data } = await authService.getProfile();
    return data.data;
  };

  const { data: dataProfile, isPending: isPendingDataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: true,
  });

  const getEventByOrganizer = async () => {
    const { data } = await eventsService.getEventByOrganizer();
    return data.data;
  };

  const { data: dataEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["EventsOrganizer"],
    queryFn: getEventByOrganizer,
    enabled: true,
  });

  const totalData = [
    {
      title: "Total My Events",
      value: dataEvents?.length,
      icon: (
        <>
          <MdEvent className="bg-primary-200 rounded-full p-1 text-4xl" />
        </>
      ),
      detail: "Events",
    },
  ];

  return {
    totalData,

    dataEvents,
    isLoadingEvents,

    dataProfile,
    isPendingDataProfile,
  };
};

export default useViewDashboardOrganizer;
