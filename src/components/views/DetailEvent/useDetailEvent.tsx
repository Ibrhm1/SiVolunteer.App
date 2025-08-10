import organizerServices from "@/services/organizers.service";
import categoryService from "@/services/category.service";
import eventsService from "@/services/events.service";
import eventVolunteerService from "@/services/eventVolunteer.service";
import regionService from "@/services/region.service";
import userService from "@/services/user.service";
import { IEventVolunteer } from "@/types/EventVolunteer";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const router = useRouter();

  const getEventBySlug = async () => {
    const { data } = await eventsService.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataDetailEventSlug, refetch: refetchDetailEventSlug } =
    useQuery({
      queryKey: ["EventBySlug"],
      queryFn: getEventBySlug,
      enabled: router.isReady,
    });

  const getOrganizerName = async () => {
    const { data } = await organizerServices.getOrganizerById(
      `${dataDetailEventSlug?.createdBy}`,
    );
    return data.data;
  };

  const { data: dataOrganizerName, isLoading: isLoadingOrganizerName } =
    useQuery({
      queryKey: ["OrganizerName"],
      queryFn: getOrganizerName,
      enabled: !!dataDetailEventSlug?.createdBy,
    });

  const getCategoryName = async () => {
    const { data } = await categoryService.getCategoryById(
      `${dataDetailEventSlug?.category}`,
    );
    return data.data;
  };

  const { data: dataCategoryName } = useQuery({
    queryKey: ["CategoryName"],
    queryFn: getCategoryName,
    enabled: !!dataDetailEventSlug?.category,
  });

  const getRegion = async () => {
    const { data } = await regionService.getRegencyById(
      `${dataDetailEventSlug?.location?.region}`,
    );
    return data.data;
  };

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", dataDetailEventSlug?.location?.region],
    queryFn: getRegion,
    enabled: !!dataDetailEventSlug?.location?.region,
  });

  const getEventVolunteer = async () => {
    const { data } = await eventVolunteerService.getEventVolunteerByEventId(
      `${dataDetailEventSlug?._id}`,
    );
    return data.data;
  };

  const { data: dataEventVolunteer } = useQuery({
    queryKey: ["EventVolunteer"],
    queryFn: getEventVolunteer,
    enabled: !!dataDetailEventSlug?._id,
  });
  const getUsersByIds = async () => {
    const userIds = dataEventVolunteer.map(
      (item: IEventVolunteer) => item.userId,
    );
    const responses = await Promise.all(
      userIds.map((id: string) => userService.getMemberById(id)),
    );
    return responses.map((res) => res.data.data); // hasil array of user
  };

  const { data: dataUser } = useQuery({
    queryKey: ["User", dataEventVolunteer],
    queryFn: getUsersByIds,
    enabled: !!dataEventVolunteer && dataEventVolunteer.length > 0,
  });

  return {
    dataDetailEventSlug,
    refetchDetailEventSlug,

    dataCategoryName,

    dataRegion,

    dataOrganizerName,
    isLoadingOrganizerName,

    dataEventVolunteer,

    dataUser,
  };
};

export default useDetailEvent;
