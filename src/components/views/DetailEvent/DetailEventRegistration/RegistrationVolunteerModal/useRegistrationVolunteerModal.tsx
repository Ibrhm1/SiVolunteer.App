import authService from "@/services/auth.service";
import eventsService from "@/services/events.service";
import eventVolunteerService from "@/services/eventVolunteer.service";
import { IEventVolunteerRegister } from "@/types/EventVolunteer";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schema = Yup.object().shape({
  motivation: Yup.string().required("Motivation is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const useRegistrationVolunteerModal = () => {
  const { query } = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getEventBySlug = async () => {
    const { data } = await eventsService.getEventBySlug(`${query.slug}`);
    return data.data;
  };

  const { data: dataDetailEventSlug } = useQuery({
    queryKey: ["EventBySlug"],
    queryFn: getEventBySlug,
    enabled: !!query.slug,
  });

  const registrationEventVolunteer = async (
    payload: IEventVolunteerRegister,
  ) => {
    const { data } = await eventVolunteerService.createEventVolunteer(
      payload,
      dataDetailEventSlug._id,
    );
    return data.data;
  };

  const {
    mutate: mutateRegistrationEventVolunteer,
    isPending: isPendingRegistrationEventVolunteer,
    isSuccess: isSuccessRegistrationEventVolunteer,
  } = useMutation({
    mutationFn: registrationEventVolunteer,
    onError: (error: any) => {
      const status =
        error.response?.data?.meta?.status || error.response?.status;
      const message =
        error.response?.data?.meta?.message || "Terjadi kesalahan.";

      switch (status) {
        case 400:
          return toast.error("Data tidak valid", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        case 401:
          return toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        case 404:
          return toast.error("Event tidak ditemukan", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        case 409:
          return toast.error("Anda sudah terdaftar pada event ini", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        default:
          return toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
      }
    },
    onSuccess: () => {
      toast.success("Anda berhasil mendaftar sebagai volunteer", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  const handleCreateEventVolunteer = (data: IEventVolunteerRegister) => {
    mutateRegistrationEventVolunteer(data);
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: () => authService.getProfile().then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleOnClose = (onClose: () => void) => {
    reset({
      motivation: "",
      email: dataProfile?.email,
      phone: dataProfile?.phone,
    });
    onClose();
  };

  return {
    dataProfile,
    control,
    handleSubmit,
    errors,
    handleOnClose,
    setValue,
    isPendingRegistrationEventVolunteer,
    isSuccessRegistrationEventVolunteer,
    handleCreateEventVolunteer,
  };
};

export default useRegistrationVolunteerModal;
