import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller } from "react-hook-form";
import useViewLogin from "./useViewLogin";
import { FaEye, FaEyeSlash, FaHome, FaLock, FaRegUser } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { publicImage } from "@/components/images/render.image";

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
    <Card className="m-3 p-8 lg:w-1/2">
      <div className="flex justify-center">
        <Image src={publicImage.Login} alt="logo" width={350} height={350} />
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
                placeholder="Email / Username"
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
                placeholder="********"
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
          <div className="flex w-full items-center gap-2">
            <Button
              size="lg"
              as={Link}
              href="/"
              className="w-1/6 font-bold"
              isIconOnly
              color={
                !!errors.identifier || !!errors.password
                  ? "danger"
                  : "secondary"
              }
            >
              <FaHome />
            </Button>
            <Button
              size="lg"
              type="submit"
              color={
                !!errors.identifier || !!errors.password ? "danger" : "primary"
              }
              className="w-5/6 font-bold"
              isDisabled={isPendingLogin}
            >
              {isPendingLogin ? (
                <Spinner color="primary" />
              ) : (
                <>
                  <IoLogInOutline className="text-xl" />
                  <span>Login</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default ViewLogin;
