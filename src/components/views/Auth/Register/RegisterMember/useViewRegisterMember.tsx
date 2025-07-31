import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterUser } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import userService from "@/services/user.service";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please enter your fullname"),
  username: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email"),
  address: yup.string().required("Please enter your address"),
  phone: yup.string().required("Please enter your phone number"),
  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords not match")
    .required("Please enter your password confirmation"),
});

const useViewRegisterMember = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

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

  const registerServices = async (payload: IRegisterUser) => {
    const result = await userService.register(payload);
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

  const handleRegister = (data: IRegisterUser) => mutateRegister(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useViewRegisterMember;
