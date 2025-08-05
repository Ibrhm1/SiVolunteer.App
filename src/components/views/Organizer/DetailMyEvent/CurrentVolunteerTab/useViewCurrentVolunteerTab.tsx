import eventVolunteerService from "@/services/eventVolunteer.service";
import userService from "@/services/user.service";
import { IEventVolunteer } from "@/types/EventVolunteer";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewCurrentVolunteerTab = () => {
  const { query, isReady } = useRouter();

  const getEventVolunteerByEvent = async () => {
    const { data } = await eventVolunteerService.getEventVolunteerByEvent(
      `${query.id}`,
    );
    return data.data;
  };

  const {
    data: dataEventVolunteer,
    isPending: isPendingDataEventVolunteer,
    refetch: refetchEventVolunteer,
  } = useQuery({
    queryKey: ["EventVolunteer"],
    queryFn: getEventVolunteerByEvent,
    enabled: isReady,
  });

  const getUserByEventVolunteer = async () => {
    if (!dataEventVolunteer) return [];

    const responses = await Promise.all(
      dataEventVolunteer.map((item: IEventVolunteer) =>
        userService.getMemberById(`${item.userId}`),
      ),
    );

    return responses.map((res) => res.data.data);
  };

  const { data: dataUser, isPending: isPendingDataUser } = useQuery({
    queryKey: ["User", dataEventVolunteer],
    queryFn: getUserByEventVolunteer,
    enabled: isReady && !!dataEventVolunteer,
  });

  const mergedData = dataEventVolunteer?.map((volunteer: IEventVolunteer) => {
    const user = dataUser?.find((u) => u._id === volunteer.userId);
    return {
      ...volunteer,
      user: user?.fullName,
    };
  });

  return {
    refetchEventVolunteer,
    isPendingDataUser,
    isPendingDataEventVolunteer,
    mergedData,
  };
};

export default useViewCurrentVolunteerTab;
