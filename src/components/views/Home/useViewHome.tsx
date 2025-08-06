import {
  LIMIT_CATEGORY,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constants/list.constant";
import organizerServices from "@/services/authOrganizer.service";
import categoryService from "@/services/category.service";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";

const useViewHome = () => {
  const currentQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}`;
  const getAllEvents = async (params: string) => {
    const { data } = await eventsService.getEvents(params);
    return data.data;
  };

  const { data: dataEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["Events"],
    queryFn: () => getAllEvents(`isPublish=true`),
  });

  const getCategories = async () => {
    let params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;
    const { data } = await categoryService.getAllCategories(params);
    return data.data;
  };

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: getCategories,
  });

  const getAlOrganizers = async () => {
    const { data } = await organizerServices.getAllOrganizer();
    return data.data;
  };

  const { data: dataOrganizer, isLoading: isLoadingOrganizer } = useQuery({
    queryKey: ["Organizer"],
    queryFn: getAlOrganizers,
  });

  return {
    dataEvents,
    isLoadingEvents,
    dataCategory,
    isLoadingCategory,
    dataOrganizer,
    isLoadingOrganizer,
  };
};

export default useViewHome;
