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
import useViewProfilePicture from "./useViewProfilePicture";
import { Controller } from "react-hook-form";
import InputFile from "@/components/UI/InputFile";
import { useEffect, useState } from "react";
import { FaPen, FaRegSave } from "react-icons/fa";
import { IUserUpdate } from "@/types/User";

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
        <CardHeader>
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
        <CardBody className="gap-2">
          <Controller
            control={controlUpdateProfilePicture}
            name="profilePicture"
            render={({ field: { onChange, value, ...field } }) => (
              <>
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

export default ViewProfilePicture;
