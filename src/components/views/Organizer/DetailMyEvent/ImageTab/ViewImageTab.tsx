import {
  Button,
  Card,
  CardBody,
  Image,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useViewImageTab from "./useViewImageTab";
import { IEvent } from "@/types/Event";
import { Controller } from "react-hook-form";
import InputFile from "@/components/UI/InputFile";
import { useEffect } from "react";
import { FaRegSave } from "react-icons/fa";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: IEvent) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  refetchMyEvent: () => void;
}

const ViewImageTab = (props: PropTypes) => {
  const {
    currentImage,
    isPendingUpdate,
    isSuccessUpdate,
    onUpdate,
    refetchMyEvent,
  } = props;
  const {
    controlUpdateImage,
    handleSubmitUpdateImage,
    errorsUpdateImage,
    resetUpdateImage,
    preview,
    handleUploadImage,
    handleDeleteImage,
    isPendingMuteteUploadFile,
    isPendingMuteteDeleteFile,
  } = useViewImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
      refetchMyEvent();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-2/3">
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">
              Current Image
            </p>
            <Skeleton
              isLoaded={!!currentImage}
              className="aspect-video rounded-lg"
            >
              <Image
                src={currentImage}
                alt="Image"
                width={"100%"}
                className="w-full rounded-lg object-cover"
              />
            </Skeleton>
            <Controller
              control={controlUpdateImage}
              name="image"
              render={({ field: { onChange, ...field } }) => (
                <>
                  <InputFile
                    {...field}
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
                    isDropable
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
        </form>
      </CardBody>
    </Card>
  );
};

export default ViewImageTab;
