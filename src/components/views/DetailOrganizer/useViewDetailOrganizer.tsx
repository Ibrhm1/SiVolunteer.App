import organizerServices from "@/services/organizers.service";
import eventsService from "@/services/events.service";
import regionService from "@/services/region.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewDetailOrganizer = () => {
  const { query } = useRouter();

  const getOrganizerById = async () => {
    const { data } = await organizerServices.getOrganizerById(`${query.id}`);
    return data.data;
  };

  const { data: dataOrganizer, isLoading: isLoadingOrganizer } = useQuery({
    queryKey: ["Organizer"],
    queryFn: getOrganizerById,
    enabled: !!query.id,
  });

  const getEventByOrganizerId = async () => {
    const { data } = await eventsService.getEventByCreatedBy(`${query.id}`);
    return data.data;
  };

  const { data: dataEvent, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: getEventByOrganizerId,
    enabled: !!query.id,
  });

  const getRegencyById = async () => {
    const { data } = await regionService.getRegencyById(
      `${dataOrganizer?.location?.domicile}`,
    );
    return data.data;
  };

  const { data: dataRegency, isLoading: isLoadingRegency } = useQuery({
    queryKey: ["Regency"],
    queryFn: getRegencyById,
    enabled: !!dataOrganizer?.location?.domicile,
  });

  const formatePhone = (phone: string) => {
    const result = phone?.replace(/^08/, "62");
    return result;
  };

  return {
    dataOrganizer,
    isLoadingOrganizer,

    dataEvent,
    isLoadingEvent,

    dataRegency,
    isLoadingRegency,

    formatePhone,
  };
};

export default useViewDetailOrganizer;
