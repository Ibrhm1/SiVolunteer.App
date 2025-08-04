import categoryService from "@/services/category.service";
import eventsService from "@/services/events.service";
import regionService from "@/services/region.service";
import userService from "@/services/user.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useViewDetailMyEvent = () => {
  const { query, isReady } = useRouter();

  //* update event
  const updateMyEvent = async (payload: IEvent) => {
    const { data } = await eventsService.updateEvent(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: (payload: IEvent) => updateMyEvent(payload),
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success update your event", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  const getMyEventById = async () => {
    const { data } = await eventsService.getEventById(`${query.id}`);
    return data.data;
  };

  const {
    data: dataMyEvent,
    isPending: isPendingMyEvent,
    refetch: refetchMyEvent,
  } = useQuery({
    queryKey: ["MyEvent"],
    queryFn: getMyEventById,
    enabled: isReady,
  });

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion"],
      queryFn: () =>
        regionService.getRegencyById(dataMyEvent?.location?.region),
      enabled: !!dataMyEvent?.location?.region,
    });

  const { data: dataCategory, isPending: isPendingDataCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => categoryService.getCategoryById(`${dataMyEvent?.category}`),
    enabled: !!dataMyEvent?.category,
  });

  const { data: dataVolunteers, isPending: isPendingVolunteers } = useQuery({
    queryKey: ["Volunteers"],
    queryFn: () =>
      userService.getMemberById(`${dataMyEvent?.currentVolunteers}`),
    enabled: !!dataMyEvent?.currentVolunteers,
  });

  const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

  const handleUpdateDetail = (data: IEventForm) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      endDate: toDateStandard(data.endDate as DateValue),
      location: {
        region: `${data.region}`,
        address: `${data.address}`,
      },
    };
    mutateUpdateEvent(payload);
  };

  return {
    dataMyEvent,
    refetchMyEvent,
    isPendingMyEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    handleUpdateEvent,
    handleUpdateDetail,

    dataCategory,
    isPendingDataCategory,

    dataDefaultRegion,
    isPendingDefaultRegion,

    dataVolunteers,
    isPendingVolunteers,
  };
};

export default useViewDetailMyEvent;
