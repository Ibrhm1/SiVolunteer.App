import { ICategory } from "@/types/Category";
import { IEvent } from "@/types/Event";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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

interface PropTypes {
  dataEvent: IEvent;
  dataCategory: ICategory;
}

const ViewDetailEventRegistration = (props: PropTypes) => {
  const registrationVolunteerModal = useDisclosure();
  const session = useSession();
  const { dataEvent } = props;
  return (
    <Skeleton className="rounded-lg" isLoaded={!!dataEvent}>
      <Card radius="lg" className="py-4 lg:sticky lg:top-[80px]">
        <CardHeader>
          <h1 className="text-foreground-700 font-semibold md:text-sm lg:text-xl">
            {dataEvent?.name}
          </h1>
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
              href={"/auth/login"}
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
