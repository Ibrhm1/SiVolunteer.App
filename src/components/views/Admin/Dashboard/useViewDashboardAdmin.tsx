import authService from "@/services/auth.service";
import organizerServices from "@/services/authOrganizer.service";
import eventsService from "@/services/events.service";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

const useViewDashboardAdmin = () => {
  const { data: dataProfile, isPending: isPendingDataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: () => authService.getProfile(),
  });

  const { data: totalEvents = 0, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["Events"],
    queryFn: () => eventsService.getEvents(),
    select: (res) => res.data.data.length,
  });

  const { data: totalOrganizers = 0, isLoading: isLoadingOrganizer } = useQuery(
    {
      queryKey: ["Organizer"],
      queryFn: () => organizerServices.getAllOrganizer(),
      select: (res) => res.data.data.length,
    },
  );

  const { data: totalMembers = 0, isLoading: isLoadingMember } = useQuery({
    queryKey: ["Member"],
    queryFn: () => userService.getAllMember(),
    select: (res) => res.data.data.length,
  });

  const totalData = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: <MdEvent className="bg-primary-200 rounded-full p-1 text-4xl" />,
      detail: "Events",
    },
    {
      title: "Total Members",
      value: totalMembers,
      icon: <FaUser className="bg-primary-200 rounded-full p-1 text-4xl" />,
      detail: "Members",
    },
    {
      title: "Total Organizers",
      value: totalOrganizers,
      icon: <FaUsers className="bg-primary-200 rounded-full p-1 text-4xl" />,
      detail: "Organizers",
    },
  ];

  return {
    dataProfile,
    isPendingDataProfile,
    totalData,
    isLoadingMember,
    isLoadingEvents,
    isLoadingOrganizer,
  };
};

export default useViewDashboardAdmin;
