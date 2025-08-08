import { IEventVolunteer } from "@/types/EventVolunteer";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import useViewUpdateStatusModal from "./useViewUpdateStatusModal";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchEventVolunteer: () => void;
  onOpenChange: () => void;
  selectedDataEventVolunteer: IEventVolunteer | null;
  setSelectedDataEventVolunteer: Dispatch<
    SetStateAction<IEventVolunteer | null>
  >;
  btnValueStatus: string;
}

const ViewUpdateStatusModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchEventVolunteer,
    selectedDataEventVolunteer,
    setSelectedDataEventVolunteer,
    btnValueStatus,
  } = props;
  const {
    handleUpdateStatus,
    handleSubmitFormUpdateStatus,
    isPendingMutateUpdateStatusEventVolunteer,
    isSuccessMutateUpdateStatusEventVolunteer,
    setValueUpdateTicket,
  } = useViewUpdateStatusModal(`${selectedDataEventVolunteer?._id}`);

  useEffect(() => {
    if (selectedDataEventVolunteer) {
      setValueUpdateTicket("status", btnValueStatus);
    }
  }, [selectedDataEventVolunteer, btnValueStatus]);

  useEffect(() => {
    if (isSuccessMutateUpdateStatusEventVolunteer) {
      onClose();
      refetchEventVolunteer();
      setSelectedDataEventVolunteer(null);
    }
  }, [isSuccessMutateUpdateStatusEventVolunteer]);

  return (
    <Modal
      isDismissable={false}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      backdrop="blur"
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitFormUpdateStatus(handleUpdateStatus)}>
        <ModalContent>
          <ModalHeader>Update Status</ModalHeader>
          <ModalBody>
            <p className="text-medium">
              Are you sure want to update status?
              <Chip
                radius="sm"
                color={
                  btnValueStatus === "accepted"
                    ? "success"
                    : btnValueStatus === "pending"
                      ? "warning"
                      : "danger"
                }
                variant="flat"
                className="ml-1 capitalize"
              >
                {btnValueStatus}
              </Chip>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              size="md"
              onPress={onClose}
              disabled={isPendingMutateUpdateStatusEventVolunteer}
            >
              <MdOutlineCancel size={18} />
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="flat"
              size="md"
              disabled={isPendingMutateUpdateStatusEventVolunteer}
            >
              {isPendingMutateUpdateStatusEventVolunteer ? (
                <Spinner size="sm" color="white" />
              ) : (
                <>
                  <FaRegSave />
                  Update Status
                </>
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ViewUpdateStatusModal;
