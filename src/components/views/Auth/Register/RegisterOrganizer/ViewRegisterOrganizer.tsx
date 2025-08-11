import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Spinner,
  Textarea,
} from "@heroui/react";
import React from "react";
import { FaEye, FaEyeSlash, FaLock, FaPhoneAlt, FaUser } from "react-icons/fa";
import { VscMention } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";
import { Controller } from "react-hook-form";
import useViewRegisterOrganizer from "./useViewRegisterOrganizer";
import { IoIosContact } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { IRegency } from "@/types/region";
import { RiUserAddFill } from "react-icons/ri";
import Link from "next/link";

const ViewRegisterOrganizer = () => {
  const {
    errors,
    control,
    dataRegion,
    handleSubmit,
    searchRegency,
    handleRegister,
    visiblePassword,
    isPendingRegister,
    handleSearchRegion,
    handleVisiblePassword,
  } = useViewRegisterOrganizer();

  const error: (keyof typeof errors)[] = [
    "organizerName",
    "email",
    "password",
    "confirmPassword",
    "contactPerson",
    "descriptionOrganizer",
    "dateEstablished",
    "phone",
    "domicile",
    "address",
  ];

  return (
    <Card className="p-5 md:w-2/3">
      <CardHeader className="bg-default flex-col items-center justify-center rounded-2xl">
        <h1 className="w-full text-center text-2xl font-bold">
          Registrasi Sebagai Organizer
        </h1>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleRegister)}
        >
          <p className="text-medium m-0 p-0 font-semibold">Name Organizer</p>
          <div className="flex gap-2">
            <Controller
              name="organizerName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Organizer Name"
                  placeholder="Organizer Name"
                  className="font-semibold lg:w-1/3"
                  labelPlacement="inside"
                  startContent={<VscMention className="text-2xl font-bold" />}
                  isInvalid={!!errors.organizerName}
                  errorMessage={errors.organizerName?.message}
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
          <p className="text-medium m-0 p-0 font-semibold">
            Informasi Organizer
          </p>
          <Controller
            name="descriptionOrganizer"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                minRows={2}
                isClearable
                className="font-semibold"
                label="Description Organizer"
                onClear={() => field.onChange("")}
                placeholder="Describe your organization"
                startContent={<FaUser className="text-medium" />}
                isInvalid={!!errors.descriptionOrganizer}
                errorMessage={errors.descriptionOrganizer?.message}
              />
            )}
          />
          <Controller
            name="dateEstablished"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Date Established"
                className="font-semibold"
                isInvalid={!!errors.dateEstablished}
                errorMessage={errors.dateEstablished?.message}
              />
            )}
          />
          <div className="flex gap-2">
            <Controller
              name="contactPerson"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Contact Person"
                  className="font-semibold lg:w-2/3"
                  labelPlacement="inside"
                  startContent={<IoIosContact className="text-xl" />}
                  isInvalid={!!errors.contactPerson}
                  errorMessage={errors.contactPerson?.message}
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
                  placeholder="+628123456789"
                  className="font-semibold lg:w-2/3"
                  labelPlacement="inside"
                  startContent={<FaPhoneAlt />}
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
          </div>
          <p className="text-medium m-0 p-0 font-semibold">Alamat</p>
          <div className="flex gap-2">
            <Controller
              name="domicile"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  label="Domicile"
                  startContent={<GrMapLocation />}
                  className="font-semibold lg:w-1/2"
                  isInvalid={!!errors.domicile}
                  errorMessage={errors.domicile?.message}
                  onSelectionChange={(value) => onChange(value)}
                  onInputChange={(search) => handleSearchRegion(search)}
                  defaultItems={
                    dataRegion?.data.data && searchRegency !== ""
                      ? dataRegion?.data.data
                      : []
                  }
                >
                  {(regency: IRegency) => (
                    <AutocompleteItem key={regency.id}>
                      {regency.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Address"
                  placeholder="Jl. Raya No. 1"
                  className="font-semibold lg:w-1/2"
                  labelPlacement="inside"
                  startContent={<FaLocationDot />}
                  isInvalid={!!errors.address}
                  errorMessage={errors.address?.message}
                />
              )}
            />
          </div>
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
                <RiUserAddFill className="text-medium" />
                <span>Register</span>
              </>
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ViewRegisterOrganizer;
