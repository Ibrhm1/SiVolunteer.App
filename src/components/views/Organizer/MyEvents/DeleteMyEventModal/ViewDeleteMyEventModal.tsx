import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useViewDeleteMyEventModal from "./useViewDeleteMyEventModal";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refecthMyEvent: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const ViewDeleteMyEventModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refecthMyEvent,
    selectedId,
    setSelectedId,
  } = props;
  const {
    isPendingMutateDeleteMyEvent,
    isSuccessMutateDeleteMyEvent,
    mutateDeleteMyEvent,
  } = useViewDeleteMyEventModal();

  useEffect(() => {
    if (isSuccessMutateDeleteMyEvent) {
      onClose();
      refecthMyEvent();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteMyEvent]);

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      placement="center"
      isDismissable={false}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="mt-4">
        <ModalHeader>Delete</ModalHeader>
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
            disabled={isPendingMutateDeleteMyEvent}
          >
            <MdOutlineCancel size={18} />
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteMyEvent}
            onPress={() => mutateDeleteMyEvent(selectedId)}
          >
            {isPendingMutateDeleteMyEvent ? (
              <Spinner size="sm" color="default" />
            ) : (
              "Delete Event"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewDeleteMyEventModal;
