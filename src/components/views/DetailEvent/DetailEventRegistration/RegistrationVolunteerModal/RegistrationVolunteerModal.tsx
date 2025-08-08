import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useRegistrationVolunteerModal from "./useRegistrationVolunteerModal";
import { Controller } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect } from "react";
import { IoCreate } from "react-icons/io5";
import { useRouter } from "next/router";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  onOpenChange: () => void;
}

const RegistrationVolunteerModal = (props: PropTypes) => {
  const router = useRouter();
  const { eventName, isOpen, onClose, onOpenChange } = props;
  const {
    dataProfile,
    control,
    handleSubmit,
    errors,
    handleOnClose,
    setValue,
    isPendingRegistrationEventVolunteer,
    isSuccessRegistrationEventVolunteer,
    handleCreateEventVolunteer,
  } = useRegistrationVolunteerModal();

  useEffect(() => {
    setValue("email", `${dataProfile?.email}`);
    setValue("phone", `${dataProfile?.phone}`);
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessRegistrationEventVolunteer) {
      router.push("/events");
    }
  }, [isSuccessRegistrationEventVolunteer]);

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      backdrop="blur"
      placement="center"
      isDismissable={false}
      onOpenChange={onOpenChange}
      className="mx-2"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmit(handleCreateEventVolunteer)}>
        <ModalContent>
          <ModalHeader>
            <h2>Daftar {eventName}</h2>
          </ModalHeader>
          <ModalBody>
            <Controller
              control={control}
              name="motivation"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Motivasi kamu untuk mengikuti event ini"
                  className="font-semibold"
                  isInvalid={!!errors.motivation}
                  errorMessage={errors.motivation?.message}
                />
              )}
            />
            <span className="text-foreground-600 text-sm">
              Cek nomor telepon dan email kamu apakah sudah benar?
            </span>
            <div className="flex flex-col gap-2">
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Masukan nomor telepon kamu"
                    className="font-semibold"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Masukan email kamu"
                    className="font-semibold"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={isPendingRegistrationEventVolunteer}
            >
              <MdOutlineCancel size={18} />
              Cancel
            </Button>
            <Button
              color="primary"
              variant="ghost"
              type="submit"
              disabled={isPendingRegistrationEventVolunteer}
            >
              {isPendingRegistrationEventVolunteer ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <>
                  <IoCreate size={18} />
                  Daftar Sekarang
                </>
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default RegistrationVolunteerModal;
