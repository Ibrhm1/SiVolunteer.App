import {
  Button,
  Card,
  CardBody,
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
    <Card className="mx-auto h-fit w-1/2 lg:w-1/4">
      <form onSubmit={handleSubmitUpdateProfilePicture(onUpdate)}>
        <CardBody className="gap-2">
          <div className="flex flex-col items-center">
            <Skeleton isLoaded={!!currentImage} className="h-48 rounded-full">
              <Image
                src={currentImage}
                alt="Image"
                width={200}
                className="rounded-full object-cover"
              />
            </Skeleton>
            <Button
              color="primary"
              size="sm"
              isIconOnly
              onPress={() => setOpen(!open)}
              className="absolute top-2 right-2"
            >
              <FaPen />
            </Button>
            {open && (
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
            )}
          </div>
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
        </CardBody>
      </form>
    </Card>
  );
};

export default ViewProfilePicture;
