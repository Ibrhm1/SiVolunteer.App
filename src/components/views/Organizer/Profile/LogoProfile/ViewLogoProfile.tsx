import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useViewLogoProfile from "./useViewLogoProfile";
import { Controller } from "react-hook-form";
import InputFile from "@/components/UI/InputFile";
import { useEffect, useState } from "react";
import { FaPen, FaRegSave } from "react-icons/fa";
import { IOrganizerUpdate } from "@/types/Organizer";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: IOrganizerUpdate) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  refetchProfile: () => void;
}

const ViewLogoProfile = (props: PropTypes) => {
  const {
    currentImage,
    isPendingUpdate,
    isSuccessUpdate,
    onUpdate,
    refetchProfile,
  } = props;
  const {
    controlUpdateLogo,
    handleSubmitUpdateLogo,
    errorsUpdateLogo,
    resetUpdateLogo,
    preview,

    handleUploadLogo,
    handleDeleteLogo,
    isPendingMuteteUploadFile,
    isPendingMuteteDeleteFile,
  } = useViewLogoProfile();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLogo();
      refetchProfile();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="mx-auto w-full xl:w-1/2">
      <form onSubmit={handleSubmitUpdateLogo(onUpdate)}>
        <CardHeader className="gap-2">
          <div className="flex w-full flex-col items-center gap-2">
            <Skeleton isLoaded={!!currentImage} className="h-48 rounded-full">
              <Image
                src={currentImage}
                alt="Image"
                width={200}
                height={200}
                className="aspect-square rounded-lg object-cover"
              />
            </Skeleton>
          </div>
        </CardHeader>
        <CardBody>
          <Controller
            control={controlUpdateLogo}
            name="logo"
            render={({ field: { onChange, ...field } }) => (
              <>
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteLogo(onChange)}
                  onUpload={(files) => handleUploadLogo(files, onChange)}
                  isUploading={isPendingMuteteUploadFile}
                  isDeleting={isPendingMuteteDeleteFile}
                  isInvalid={!!errorsUpdateLogo.logo}
                  errorMessage={errorsUpdateLogo.logo?.message}
                  isDropable
                  preview={typeof preview === "string" ? preview : ""}
                />
              </>
            )}
          />
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            color="primary"
            isIconOnly
            variant="ghost"
            className="disabled:bg-default-200"
            disabled={isPendingMuteteUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              <FaRegSave />
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ViewLogoProfile;
