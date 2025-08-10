import organizerServices from "@/services/organizers.service";
import { IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schemaUpdatePassword = Yup.object().shape({
  oldPassword: Yup.string().required("Please enter your old password"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords not match")
    .required("Please enter your password confirmation"),
});

const useViewUpdatePassword = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await organizerServices.updatePassword(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingUpdatePassword,
    isSuccess: isSuccessUpdatePassword,
  } = useMutation({
    mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success update password", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      reset();
    },
  });

  const handleUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  const handleVisiblePassword = (
    key: "oldPassword" | "password" | "confirmPassword",
  ) => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  return {
    control,
    errors,
    handleSubmit,
    reset,
    isPendingUpdatePassword,
    isSuccessUpdatePassword,
    handleUpdatePassword,
    visiblePassword,
    handleVisiblePassword,
  };
};

export default useViewUpdatePassword;
