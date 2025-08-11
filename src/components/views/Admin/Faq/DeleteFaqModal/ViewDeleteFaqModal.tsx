import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import useViewDeleteFaqModal from "./useViewDeleteFaqModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refecthFaq: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const ViewDeleteFaqModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refecthFaq,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteFaq,
    isPendingMutateDeleteFaq,
    isSuccessMutateDeleteFaq,
  } = useViewDeleteFaqModal();

  useEffect(() => {
    if (isSuccessMutateDeleteFaq) {
      onClose();
      refecthFaq();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteFaq]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      backdrop="blur"
      isDismissable={false}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="mt-4">
        <ModalHeader>Delete Faq</ModalHeader>
        <ModalBody>
          <p className="text-medium">Are you sure to delete this Faq?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="default"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteFaq}
          >
            <MdOutlineCancel size={18} />
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteFaq}
            onPress={() => mutateDeleteFaq(selectedId)}
          >
            {isPendingMutateDeleteFaq ? (
              <Spinner size="sm" color="default" />
            ) : (
              "Delete Faq"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewDeleteFaqModal;
