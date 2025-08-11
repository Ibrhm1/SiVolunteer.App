import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import React from "react";
import useViewRegisterMember from "./useViewRegisterMember";
import { FaEye, FaEyeSlash, FaLock, FaPhoneAlt, FaUser } from "react-icons/fa";
import { VscMention } from "react-icons/vsc";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Controller } from "react-hook-form";
import Link from "next/link";
import { RiUserAddFill } from "react-icons/ri";

const ViewRegisterMember = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useViewRegisterMember();

  const error: (keyof typeof errors)[] = [
    "fullName",
    "username",
    "email",
    "password",
    "confirmPassword",
    "phone",
    "address",
  ];

  return (
    <Card className="p-5 md:w-1/2">
      <CardHeader className="bg-default flex-col items-center justify-center rounded-xl">
        <h1 className="w-full text-center text-2xl font-bold">
          Regristasi Sebagai Member
        </h1>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Full Name"
                labelPlacement="inside"
                placeholder="Full name"
                className="font-semibold"
                startContent={<FaUser />}
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName?.message}
              />
            )}
          />
          <div className="flex gap-2">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Username"
                  placeholder="Username"
                  className="font-semibold lg:w-1/3"
                  labelPlacement="inside"
                  startContent={<VscMention className="text-2xl font-bold" />}
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  placeholder="example@gmail.com"
                  className="font-semibold lg:w-2/3"
                  labelPlacement="inside"
                  startContent={<MdEmail className="text-2xl" />}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </div>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Address"
                placeholder="Jalan Raya No. 1, Jakarta"
                className="font-semibold"
                startContent={<MdLocationOn className="text-2xl" />}
                isInvalid={!!errors.address}
                errorMessage={errors.address?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Phone"
                placeholder="08123456789"
                className="font-semibold"
                startContent={<FaPhoneAlt className="text-xl" />}
                isInvalid={!!errors.phone}
                errorMessage={errors.phone?.message}
              />
            )}
          />
          <div className="flex gap-1">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.password ? "text" : "password"}
                  label="Password"
                  className="font-semibold lg:w-1/2"
                  placeholder="********"
                  startContent={<FaLock />}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
                        <FaEye className="text-default-400 text-xl" />
                      ) : (
                        <FaEyeSlash className="text-default-400 text-xl" />
                      )}
                    </button>
                  }
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  className="font-semibold lg:w-1/2"
                  placeholder="********"
                  startContent={<FaLock />}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="text-default-400 text-xl" />
                      ) : (
                        <FaEyeSlash className="text-default-400 text-xl" />
                      )}
                    </button>
                  }
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
          </div>
          <p className="text-sm font-normal">
            Sudah punya akun?&nbsp;
            <Link href="/auth/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
          <Button
            type="submit"
            variant="ghost"
            className="font-bold"
            isDisabled={isPendingRegister}
            color={error.some((key) => errors[key]) ? "danger" : "primary"}
          >
            {isPendingRegister ? (
              <Spinner color="primary" />
            ) : (
              <>
                <RiUserAddFill className="text-xl" />
                <span>Register</span>
              </>
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ViewRegisterMember;
