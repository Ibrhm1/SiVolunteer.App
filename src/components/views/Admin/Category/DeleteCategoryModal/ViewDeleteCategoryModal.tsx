import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useViewDeleteCategoryModal from "./useViewDeleteCategoryModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refecthCategory: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const ViewDeleteCategoryModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refecthCategory,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  } = useViewDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCategory) {
      onClose();
      refecthCategory();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteCategory]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="mt-4">
        <ModalHeader>Delete Category</ModalHeader>
        <ModalBody>
          <p className="text-medium">Are you sure to delete this category?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="default"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteCategory}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteCategory}
            onPress={() => mutateDeleteCategory(selectedId)}
          >
            {isPendingMutateDeleteCategory ? (
              <Spinner size="sm" color="default" />
            ) : (
              "Delete Category"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewDeleteCategoryModal;
