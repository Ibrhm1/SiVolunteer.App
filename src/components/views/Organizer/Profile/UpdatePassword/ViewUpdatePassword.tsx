import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import useViewUpdatePassword from "./useViewUpdatePassword";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock, FaRegSave } from "react-icons/fa";
import { useEffect } from "react";

const ViewUpdatePassword = () => {
  const {
    control,
    errors,
    handleSubmit,
    reset,
    isPendingUpdatePassword,
    isSuccessUpdatePassword,
    handleUpdatePassword,
    visiblePassword,
    handleVisiblePassword,
  } = useViewUpdatePassword();

  useEffect(() => {
    if (isSuccessUpdatePassword) {
      reset();
    }
  }, [isSuccessUpdatePassword]);

  return (
    <Card className="md:w-1/2">
      <CardHeader>
        <h1 className="text-xl font-semibold">Change Password</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <CardBody className="gap-2">
          <Controller
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <Input
                {...field}
                label="Old Password"
                variant="bordered"
                startContent={<FaLock />}
                type={visiblePassword.oldPassword ? "text" : "password"}
                endContent={
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => handleVisiblePassword("oldPassword")}
                  >
                    {visiblePassword.oldPassword ? (
                      <FaEye className="text-default-400 text-xl" />
                    ) : (
                      <FaEyeSlash className="text-default-400 text-xl" />
                    )}
                  </button>
                }
                isInvalid={!!errors.oldPassword}
                errorMessage={errors.oldPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                variant="bordered"
                labelPlacement="inside"
                startContent={<FaLock />}
                type={visiblePassword.password ? "text" : "password"}
                endContent={
                  <button
                    type="button"
                    className="focus:outline-none"
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
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                label="Confirm Password"
                labelPlacement="inside"
                startContent={<FaLock />}
                type={visiblePassword.confirmPassword ? "text" : "password"}
                endContent={
                  <button
                    type="button"
                    className="focus:outline-none"
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
          <Button
            type="submit"
            variant="flat"
            color="primary"
            disabled={isPendingUpdatePassword}
          >
            {isPendingUpdatePassword ? (
              <Spinner />
            ) : (
              <>
                <FaRegSave />
                Change Password
              </>
            )}
          </Button>
        </CardBody>
      </form>
    </Card>
  );
};

export default ViewUpdatePassword;
