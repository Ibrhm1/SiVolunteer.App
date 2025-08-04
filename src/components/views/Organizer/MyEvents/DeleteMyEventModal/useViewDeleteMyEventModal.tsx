import eventsService from "@/services/events.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useViewDeleteMyEventModal = () => {
  const deleteMyEvent = async (id: string) => {
    const { data } = await eventsService.deleteEvent(id);
    return data.data;
  };

  const {
    mutate: mutateDeleteMyEvent,
    isPending: isPendingMutateDeleteMyEvent,
    isSuccess: isSuccessMutateDeleteMyEvent,
  } = useMutation({
    mutationFn: deleteMyEvent,
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success delete event", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  return {
    mutateDeleteMyEvent,
    isPendingMutateDeleteMyEvent,
    isSuccessMutateDeleteMyEvent,
  };
};

export default useViewDeleteMyEventModal;
