import { ICategory } from "@/types/Category";
import React, { useEffect } from "react";
import useViewImage from "./useViewInfo";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";

interface PropTypes {
  dataCategory: ICategory;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ViewInfo = (props: PropTypes) => {
  const { dataCategory, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    resetUpdateInfo,
    errorsUpdateInfo,
    controlUpdateInfo,
    setValueUpdateInfo,
    handleSubmitUpdateInfo,
  } = useViewImage();

  useEffect(() => {
    setValueUpdateInfo("name", `${dataCategory?.name}`);
    setValueUpdateInfo("description", `${dataCategory?.description}`);
  }, [dataCategory]);

  return (
    <Card className="w-full p-4">
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={!!errorsUpdateInfo.name}
                  errorMessage={errorsUpdateInfo.name?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataCategory?.description}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateInfo}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!errorsUpdateInfo.description}
                  errorMessage={errorsUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            type="submit"
            color="primary"
            className="disabled:bg-default-500 mt-2"
            disabled={isPendingUpdate || !dataCategory?._id}
            startContent={<FaRegSave />}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ViewInfo;
