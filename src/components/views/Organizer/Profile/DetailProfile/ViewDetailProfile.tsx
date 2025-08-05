import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useViewDetailProfile from "./useViewDetailProfile";
import { IOrganizerUpdate } from "@/types/Organizer";
import { FaRegSave } from "react-icons/fa";

interface PropTypes {
  dataProfile: IOrganizerUpdate;
  onUpdate: (data: IOrganizerUpdate) => void;
  dataDomicile: string;
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
    setValue("organizerName", `${dataProfile?.organizerName}`);
    setValue("contactPerson", `${dataProfile?.contactPerson}`);
    setValue("phone", `${dataProfile?.phone}`);
    setValue("descriptionOrganizer", `${dataProfile?.descriptionOrganizer}`);
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
          <Skeleton
            className="rounded-lg"
            isLoaded={!!dataProfile?.organizerName}
          >
            <Controller
              control={control}
              name="organizerName"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Organizer Name"
                  labelPlacement="outside"
                  className="font-semibold"
                  isInvalid={!!errors.organizerName}
                  errorMessage={errors.organizerName?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!!dataProfile?.phone}>
            <Controller
              control={control}
              name="contactPerson"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Contact Person"
                  labelPlacement="outside"
                  className="font-semibold"
                  isInvalid={!!errors.contactPerson}
                  errorMessage={errors.contactPerson?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!!dataProfile?.phone}>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Contact Person"
                  labelPlacement="outside"
                  className="font-semibold"
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!!dataProfile?.phone}>
            <Controller
              control={control}
              name="descriptionOrganizer"
              render={({ field }) => (
                <Textarea
                  {...field}
                  minRows={2}
                  variant="bordered"
                  labelPlacement="outside"
                  label="Description Organizer"
                  className="font-semibold"
                  isInvalid={!!errors.descriptionOrganizer}
                  errorMessage={errors.descriptionOrganizer?.message}
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
