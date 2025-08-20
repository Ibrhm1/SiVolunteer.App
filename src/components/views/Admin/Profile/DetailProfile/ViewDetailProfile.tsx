import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useViewDetailProfile from "./useViewDetailProfile";
import { FaRegSave } from "react-icons/fa";
import { IUserUpdate } from "@/types/User";

interface PropTypes {
  dataProfile: IUserUpdate;
  onUpdate: (data: IUserUpdate) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  refetchProfile: () => void;
}

const ViewDetailProfile = (props: PropTypes) => {
  const {
    onUpdate,
    dataProfile,
    isPendingUpdate,
    isSuccessUpdate,
    refetchProfile,
  } = props;
  const { control, handleSubmit, errors, reset, setValue } =
    useViewDetailProfile();

  useEffect(() => {
    setValue("fullName", `${dataProfile?.fullName}`);
    setValue("phone", `${dataProfile?.phone}`);
    setValue("address", `${dataProfile?.address}`);
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate) {
      reset();
      refetchProfile();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="md:w-3/4">
      <form onSubmit={handleSubmit(onUpdate)}>
        <CardBody className="gap-2">
          <Skeleton className="rounded-lg" isLoaded={!!dataProfile?.fullName}>
            <Controller
              control={control}
              name="fullName"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Full Name"
                  labelPlacement="outside"
                  className="font-semibold"
                  isInvalid={!!errors.fullName}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
          </Skeleton>
          {/* <Input
            value={dataProfile?.email}
            disabled
            label="Email"
            labelPlacement="outside"
          /> */}
          <Skeleton className="rounded-lg" isLoaded={!!dataProfile?.phone}>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Phone"
                  labelPlacement="outside"
                  className="font-semibold"
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!!dataProfile?.address}>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Address"
                  labelPlacement="outside"
                  className="font-semibold"
                  isInvalid={!!errors.address}
                  errorMessage={errors.address?.message}
                />
              )}
            />
          </Skeleton>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            variant="flat"
            color="primary"
            disabled={isPendingUpdate}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              <>
                <FaRegSave />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ViewDetailProfile;
