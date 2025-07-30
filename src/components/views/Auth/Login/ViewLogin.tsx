import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller } from "react-hook-form";
import useViewLogin from "./useViewLogin";
import { FaEye, FaEyeSlash, FaLock, FaRegUser } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";

const ViewLogin = () => {
  const {
    control,
    errors,
    visiblePassword,
    isPendingLogin,
    handleSubmit,
    handleLogin,
    handleVisiblePassword,
  } = useViewLogin();

  return (
    <Card className="p-8 lg:w-1/2">
      <div className="flex justify-center">
        <Image src={"/login.jpg"} alt="logo" width={350} height={350} />
      </div>
      <CardBody>
        <h2 className="text-2xl font-bold">Login</h2>
        <p className="mb-4 text-sm">
          Ingin menjadi bagian dari kami? Belum punya akun?{" "}
          <Link href={"/auth/register"} className="text-primary">
            Daftar disini
          </Link>
        </p>
        {errors.root && (
          <p className="text-danger mb-4 font-medium">
            {errors?.root?.message}
          </p>
        )}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex w-full flex-col items-center justify-center gap-2 font-semibold"
        >
          <Controller
            name="identifier"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full"
                label="Email / Username"
                type="text"
                variant="bordered"
                startContent={<FaRegUser />}
                isInvalid={!!errors.identifier}
                errorMessage={errors.identifier?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full"
                label="Password"
                type={visiblePassword ? "text" : "password"}
                variant="bordered"
                startContent={<FaLock />}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                endContent={
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={handleVisiblePassword}
                  >
                    {visiblePassword ? (
                      <FaEye className="text-default-400 text-xl" />
                    ) : (
                      <FaEyeSlash className="text-default-400 text-xl" />
                    )}
                  </button>
                }
              />
            )}
          />

          <Button
            size="lg"
            type="submit"
            color={
              !!errors.identifier || !!errors.password ? "danger" : "primary"
            }
            variant="ghost"
            className="w-2/3 font-bold"
            isDisabled={isPendingLogin}
          >
            {isPendingLogin ? (
              <Spinner color="white" />
            ) : (
              <>
                <IoLogInOutline className="text-xl" />
                <span className="">Login</span>
              </>
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ViewLogin;
