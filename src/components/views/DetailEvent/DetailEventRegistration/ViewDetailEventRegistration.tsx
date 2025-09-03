import { IEvent } from "@/types/Event";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Skeleton,
  useDisclosure,
} from "@heroui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import RegistrationVolunteerModal from "./RegistrationVolunteerModal/RegistrationVolunteerModal";
import { useRouter } from "next/router";

interface PropTypes {
  dataEvent: IEvent;
}

const ViewDetailEventRegistration = (props: PropTypes) => {
  const { dataEvent } = props;
  const { query } = useRouter();
  const registrationVolunteerModal = useDisclosure();
  const session = useSession();

  return (
    <Skeleton className="rounded-lg" isLoaded={!!dataEvent}>
      <Card radius="lg" className="lg:sticky lg:top-[80px]">
        <CardHeader className="justify-between gap-2">
          <h1 className="text-foreground-700 font-semibold md:text-sm lg:text-xl">
            {dataEvent?.name}
          </h1>
          {dataEvent?.category?.name && (
            <Chip size="md" color="default" radius="md" variant="flat">
              <p className="font-semibold">{dataEvent?.category?.name}</p>
            </Chip>
          )}
        </CardHeader>
        <CardBody className="gap-4">
          <div className="bg-default-100 shadow-small flex items-start gap-2 rounded-lg p-3">
            <MdOutlineDateRange size={20} className="mt-1 w-6" />
            <div className="flex flex-col">
              <span className="xl:text-medium text-sm">
                Dimulai tanggal :{" "}
                {dayjs(`${dataEvent?.startDate}`).format("YYYY MMMM DD, HH:mm")}{" "}
                WIB
              </span>
              <span className="xl:text-medium text-sm">
                Sampai tanggal :{" "}
                {dayjs(`${dataEvent?.endDate}`).format("YYYY MMMM DD, HH:mm")}{" "}
                WIB
              </span>
            </div>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-lg bg-[#C0CCDD] px-3 py-1 text-black">
            <FaRegUser size={20} />
            <span className="lg:text-medium text-sm">
              Yang sudah mendaftar : {dataEvent?.currentVolunteers?.length}
            </span>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          {session.status === "authenticated" ? (
            <Button
              size="md"
              fullWidth
              color="primary"
              onPress={() => registrationVolunteerModal.onOpen()}
            >
              Daftar Sekarang
            </Button>
          ) : (
            <Button
              size="md"
              fullWidth
              color="primary"
              as={Link}
              href={`/auth/login?callbackUrl=/events/${query.slug}`}
            >
              Daftar Sekarang
            </Button>
          )}
        </CardFooter>
        <RegistrationVolunteerModal
          eventName={`${dataEvent?.name}`}
          {...registrationVolunteerModal}
        />
      </Card>
    </Skeleton>
  );
};

export default ViewDetailEventRegistration;
