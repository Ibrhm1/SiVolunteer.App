import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import useViewAddCategoryModal from "./useViewAddCategoryModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import InputFile from "@/components/UI/InputFile";
import { MdOutlineCancel } from "react-icons/md";
import { IoCreate } from "react-icons/io5";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refecthCategory: () => void;
  onOpenChange: () => void;
}

const ViewAddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, refecthCategory, onOpenChange } = props;
  const {
    control,
    errors,
    handleOnClose,
    handleSubmitForm,
    handleAddCategory,
    isPendingMuteteAddCategory,
    isSuccessMuteteAddCategory,
    handleUploadImage,
    isPendingMuteteUploadFile,
    preview,
    handleDeleteImage,
    isPendingMuteteDeleteFile,
  } = useViewAddCategoryModal();

  useEffect(() => {
    if (isSuccessMuteteAddCategory) {
      onClose();
      refecthCategory();
    }
  }, [isSuccessMuteteAddCategory]);

  const disabledSubmitBtn =
    isPendingMuteteAddCategory ||
    isPendingMuteteUploadFile ||
    isPendingMuteteDeleteFile;

  return (
    <div>
      <Modal
        placement="center"
        scrollBehavior="inside"
        isDismissable={false}
        isKeyboardDismissDisabled
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        onClose={() => handleOnClose(onClose)}
      >
        <form onSubmit={handleSubmitForm(handleAddCategory)}>
          <ModalContent className="mt-4">
            <ModalHeader>Add Category</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">Information</p>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Category Name"
                      variant="bordered"
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Description"
                      variant="bordered"
                      isInvalid={!!errors.description}
                      errorMessage={errors.description?.message}
                    />
                  )}
                />
                <p className="text-sm font-bold">Image</p>
                <Controller
                  control={control}
                  name="image"
                  render={({ field: { onChange, ...field } }) => (
                    <InputFile
                      {...field}
                      isDropable
                      isInvalid={!!errors.image}
                      errorMessage={errors.image?.message}
                      isDeleting={isPendingMuteteDeleteFile}
                      isUploading={isPendingMuteteUploadFile}
                      onDelete={() => handleDeleteImage(onChange)}
                      preview={typeof preview === "string" ? preview : ""}
                      onUpload={(files) => handleUploadImage(files, onChange)}
                    />
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                disabled={disabledSubmitBtn}
              >
                <MdOutlineCancel size={18} />
                Cancel
              </Button>
              <Button
                color="primary"
                variant="ghost"
                type="submit"
                disabled={disabledSubmitBtn}
              >
                {isPendingMuteteAddCategory ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <>
                    <IoCreate size={18} />
                    Create Category
                  </>
                )}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default ViewAddCategoryModal;
