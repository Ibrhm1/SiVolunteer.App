import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useViewProfilePicture from "./useViewProfilePicture";
import { Controller } from "react-hook-form";
import InputFile from "@/components/UI/InputFile";
import { useEffect, useState } from "react";
import { FaPen, FaRegSave } from "react-icons/fa";
import { IUserUpdate } from "@/types/User";
import Image from "next/image";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: IUserUpdate) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  refetchProfile: () => void;
}

const ViewProfilePicture = (props: PropTypes) => {
  const [open, setOpen] = useState(false);
  const {
    currentImage,
    isPendingUpdate,
    isSuccessUpdate,
    onUpdate,
    refetchProfile,
  } = props;
  const {
    controlUpdateProfilePicture,
    handleSubmitUpdateProfilePicture,
    errorsUpdateProfilePicture,
    resetUpdateProfilePicture,
    preview,

    handleUploadProfilePicture,
    handleDeleteProfilePicture,
    isPendingMuteteUploadFile,
    isPendingMuteteDeleteFile,
  } = useViewProfilePicture();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateProfilePicture();
      refetchProfile();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="mx-auto w-full xl:w-1/2">
      <form onSubmit={handleSubmitUpdateProfilePicture(onUpdate)}>
        <CardHeader className="gap-2">
          <div className="flex w-full flex-col items-center gap-2">
            <Skeleton isLoaded={!!currentImage} className="h-48 rounded-lg">
              <Image
                src={currentImage}
                alt="Image"
                width={200}
                height={200}
                className="aspect-square rounded-lg object-cover"
              />
            </Skeleton>
          </div>
          <Button
            color="primary"
            size="sm"
            isIconOnly
            onPress={() => setOpen(!open)}
            className="absolute top-2 right-2"
          >
            <FaPen />
          </Button>
        </CardHeader>
        <CardBody>
          {open && (
            <Controller
              control={controlUpdateProfilePicture}
              name="profilePicture"
              render={({ field: { onChange, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteProfilePicture(onChange)}
                  onUpload={(files) =>
                    handleUploadProfilePicture(files, onChange)
                  }
                  isUploading={isPendingMuteteUploadFile}
                  isDeleting={isPendingMuteteDeleteFile}
                  isInvalid={!!errorsUpdateProfilePicture.profilePicture}
                  errorMessage={
                    errorsUpdateProfilePicture.profilePicture?.message
                  }
                  isDropable
                  preview={typeof preview === "string" ? preview : ""}
                  className="w-full"
                />
              )}
            />
          )}
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

export default ViewProfilePicture;
