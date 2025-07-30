import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterOrganizer } from "@/types/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import organizerServices from "@/services/authOrganizer.service";
import { DateValue } from "@heroui/react";
import regionService from "@/services/region.service";
import useDebounce from "@/hooks/useDebounce";
import { DELAY } from "@/constants/list.constant";
import { toDateStandardWithoutTime } from "@/utils/date";

const registerSchema = yup.object().shape({
  organizerName: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords not match")
    .required("Please enter your password confirmation"),
  contactPerson: yup.string().required("Please enter your contact person"),
  descriptionOrganizer: yup.string().required("Please enter your description"),
  dateEstablished: yup
    .mixed<DateValue>()
    .required("Please enter your date established"),
  phone: yup.string().required("Please enter your phone number"),
  domicile: yup.string().required("Please enter your domicile"),
  address: yup.string().required("Please enter your address"),
});

const useViewRegisterOrganizer = () => {
  const debounce = useDebounce();
  const router = useRouter();
  const [searchRegency, setSearchRegency] = useState("");
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    data: dataRegion,
    refetch: refetchRegion,
    isPending: isPendingSearchRegion,
  } = useQuery({
    queryKey: ["Regions", searchRegency],
    queryFn: () => regionService.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerServices = async (payload: IRegisterOrganizer) => {
    const result = await organizerServices.registerOrganizer(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerServices,
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      toast.success("Register successful", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      reset();
    },
  });

  const handleRegister = (data: IRegisterOrganizer) => {
    const payload = {
      ...data,
      dateEstablished: toDateStandardWithoutTime(
        data.dateEstablished as DateValue,
      ),
    };
    mutateRegister(payload);
  };

  return {
    errors,
    control,
    dataRegion,
    handleSubmit,
    searchRegency,
    refetchRegion,
    handleRegister,
    visiblePassword,
    setSearchRegency,
    isPendingRegister,
    handleSearchRegion,
    isPendingSearchRegion,
    handleVisiblePassword,
  };
};

export default useViewRegisterOrganizer;
