import organizerServices from "@/services/organizers.service";
import categoryService from "@/services/category.service";
import eventsService from "@/services/events.service";
import regionService from "@/services/region.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewDetailEvent = () => {
  const { query, isReady } = useRouter();

  const getEventById = async () => {
    const { data } = await eventsService.getEventById(`${query.id}`);
    return data.data;
  };

  const { data: dataEvent, isPending: isPendingDataEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: getEventById,
    enabled: isReady && !!query.id,
  });

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion"],
      queryFn: () => regionService.getRegencyById(dataEvent?.location?.region),
      enabled: !!dataEvent?.location?.region,
    });

  const { data: dataCategory, isPending: isPendingDataCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => categoryService.getCategoryById(`${dataEvent?.category}`),
    enabled: !!dataEvent?.category,
  });

  const getOrganizerById = async () => {
    const { data } = await organizerServices.getOrganizerById(
      `${dataEvent?.createdBy}`,
    );
    return data.data;
  };

  const { data: dataOrganizer } = useQuery({
    queryKey: ["Organizer"],
    queryFn: getOrganizerById,
    enabled: !!dataEvent?.createdBy,
  });

  return {
    dataEvent,
    dataCategory,
    dataOrganizer,
    dataDefaultRegion,
    isPendingDataEvent,
    isPendingDataCategory,
    isPendingDefaultRegion,
  };
};

export default useViewDetailEvent;
