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
import useViewDeleteEventVolunteerModal from "./useViewDeleteEventVolunteerModal";
import { IEventVolunteer } from "@/types/EventVolunteer";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refecthEventVolunteer: () => void;
  selectedDataEventVolunteer: IEventVolunteer | null;
  setSelectedDataEventVolunteer: Dispatch<SetStateAction<IEventVolunteer | null>>;
}

const ViewDeleteEventVolunteerModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refecthEventVolunteer,
    selectedDataEventVolunteer,
    setSelectedDataEventVolunteer,
  } = props;

  const {
    mutateDeleteEventVolunteer,
    isPendingMutateDeleteEventVolunteer,
    isSuccessMutateDeleteEventVolunteer,
  } = useViewDeleteEventVolunteerModal();

  useEffect(() => {
    if (isSuccessMutateDeleteEventVolunteer) {
      onClose();
      refecthEventVolunteer();
      setSelectedDataEventVolunteer(null);
    }
  }, [isSuccessMutateDeleteEventVolunteer]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="mt-4">
        <ModalHeader>Delete Ticket</ModalHeader>
        <ModalBody>
          <p className="text-medium">Are you sure you want to delete?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedDataEventVolunteer(null);
            }}
            disabled={isPendingMutateDeleteEventVolunteer}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteEventVolunteer}
            onPress={() =>
              mutateDeleteEventVolunteer(`${selectedDataEventVolunteer?._id}`)
            }
          >
            {isPendingMutateDeleteEventVolunteer ? (
              <Spinner size="sm" color="default" />
            ) : (
              "Delete Data"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewDeleteEventVolunteerModal;
