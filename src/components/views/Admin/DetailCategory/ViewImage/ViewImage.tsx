import React, { useEffect } from "react";
import useViewImage from "./useViewImage";
import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  Image,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/UI/InputFile";
import { FaRegSave } from "react-icons/fa";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ViewImage = (props: PropTypes) => {
  const { currentImage, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    preview,
    resetUpdateImage,
    handleDeleteImage,
    handleUploadImage,
    errorsUpdateImage,
    controlUpdateImage,
    handleSubmitUpdateImage,
    isPendingMuteteDeleteFile,
    isPendingMuteteUploadFile,
  } = useViewImage();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4">
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <Skeleton
              isLoaded={!!currentImage}
              className="mx-auto aspect-square w-fit rounded-lg"
            >
              <Image
                src={currentImage}
                alt="Image"
                className="!relative aspect-square"
                width={300}
                height={300}
              />
            </Skeleton>
            <Controller
              name="image"
              control={controlUpdateImage}
              render={({ field: { onChange, ...field } }) => (
                <>
                  <InputFile
                    {...field}
                    isDropable
                    label={
                      <p className="text-default-700 mb-2 text-sm font-medium">
                        Upload New Image
                      </p>
                    }
                    onDelete={() => handleDeleteImage(onChange)}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingMuteteUploadFile}
                    isDeleting={isPendingMuteteDeleteFile}
                    isInvalid={!!errorsUpdateImage.image}
                    errorMessage={errorsUpdateImage.image?.message}
                    preview={typeof preview === "string" ? preview : ""}
                  />
                </>
              )}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            className="disabled:bg-default-500 mt-2"
            disabled={isPendingMuteteUploadFile || isPendingUpdate || !preview}
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

export default ViewImage;
