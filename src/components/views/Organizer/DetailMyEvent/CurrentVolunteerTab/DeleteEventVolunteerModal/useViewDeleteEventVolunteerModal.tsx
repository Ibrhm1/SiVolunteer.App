import eventVolunteerService from "@/services/eventVolunteer.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useViewDeleteEventVolunteerModal = () => {
  const deleteEventVolunteer = async (id: string) => {
    const { data } = await eventVolunteerService.deleteEventVolunteer(id);
    return data.data;
  };

  const {
    mutate: mutateDeleteEventVolunteer,
    isPending: isPendingMutateDeleteEventVolunteer,
    isSuccess: isSuccessMutateDeleteEventVolunteer,
  } = useMutation({
    mutationFn: deleteEventVolunteer,
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success delete your volunteer", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  return {
    mutateDeleteEventVolunteer,
    isPendingMutateDeleteEventVolunteer,
    isSuccessMutateDeleteEventVolunteer,
  };
};

export default useViewDeleteEventVolunteerModal;
