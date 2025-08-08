import eventVolunteerService from "@/services/eventVolunteer.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schameUpdate = Yup.object().shape({
  status: Yup.string().required("Please input status"),
});

const useViewUpdateStatusModal = (id: string) => {
  const {
    handleSubmit: handleSubmitFormUpdateStatus,
    setValue: setValueUpdateTicket,
  } = useForm({
    resolver: yupResolver(schameUpdate),
  });

  const updateStatusEventVolunteer = async ({ status }: { status: string }) => {
    const { data } = await eventVolunteerService.updateStatusEventVolunter(
      id,
      `${status}`,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateStatusEventVolunteer,
    isPending: isPendingMutateUpdateStatusEventVolunteer,
    isSuccess: isSuccessMutateUpdateStatusEventVolunteer,
  } = useMutation({
    mutationFn: updateStatusEventVolunteer,
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success update status", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  const handleUpdateStatus = (data: { status: string }) => {
    mutateUpdateStatusEventVolunteer(data);
  };

  return {
    handleUpdateStatus,
    handleSubmitFormUpdateStatus,
    isPendingMutateUpdateStatusEventVolunteer,
    isSuccessMutateUpdateStatusEventVolunteer,
    setValueUpdateTicket,
  };
};

export default useViewUpdateStatusModal;
