import organizerServices from "@/services/authOrganizer.service";
import eventsService from "@/services/events.service";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

const useViewDashboardAdmin = () => {
  const { data: dataEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["Events"],
    queryFn: () => eventsService.getEvents(),
    enabled: true,
  });

  const { data: dataOrganizer, isLoading: isLoadingOrganizer } = useQuery({
    queryKey: ["Organizer"],
    queryFn: () => organizerServices.getAllOrganizer(),
    enabled: true,
  });
  const { data: dataMember, isLoading: isLoadingMember } = useQuery({
    queryKey: ["Member"],
    queryFn: () => userService.getAllMember(),
    enabled: true,
  });

  const totalData = [
    {
      title: "Total Events",
      value: dataEvents?.data.data.length,
      icon: (
        <>
          <MdEvent className="bg-primary-200 rounded-full p-1 text-4xl" />
        </>
      ),
      detail: "Events",
    },
    {
      title: "Total Members",
      value: dataMember?.data.data.length,
      icon: (
        <>
          <FaUser className="bg-primary-200 rounded-full p-1 text-4xl" />
        </>
      ),
      detail: "Members",
    },
    {
      title: "Total Organizers",
      value: dataOrganizer?.data.data.length,
      icon: (
        <>
          <FaUsers className="bg-primary-200 rounded-full p-1 text-4xl" />
        </>
      ),
      detail: "Organizers",
    },
  ];

  return {
    totalData,
    isLoadingMember,
    isLoadingEvents,
    isLoadingOrganizer,
  };
};

export default useViewDashboardAdmin;
