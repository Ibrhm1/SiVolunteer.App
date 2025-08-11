import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Skeleton,
} from "@heroui/react";
import useViewDetailOrganizer from "./useViewDetailOrganizer";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import dayjs from "dayjs";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { IEvent } from "@/types/Event";

const ViewDetailOrganizer = () => {
  const {
    dataOrganizer,
    isLoadingOrganizer,

    dataEvent,
    isLoadingEvent,

    dataRegency,
    isLoadingRegency,

    formatePhone,
  } = useViewDetailOrganizer();

  return (
    <main className="w-full md:px-0">
      <header className="flex items-center p-2">
        <Skeleton
          className="h-4 w-full rounded-lg md:w-1/2"
          isLoaded={!!dataOrganizer}
        >
          <Breadcrumbs size="sm" className="w-full">
            <BreadcrumbItem href="/" className="text-sm">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem href="/search-organizers" className="text-sm">
              Organizers
            </BreadcrumbItem>
            <BreadcrumbItem className="">
              {dataOrganizer?.organizerName}
            </BreadcrumbItem>
          </Breadcrumbs>
        </Skeleton>
      </header>

      <section className="flex flex-col gap-2 px-2 py-3">
        <div className="flex w-full flex-col gap-2 xl:flex-row">
          <Skeleton
            className="w-full rounded-sm"
            isLoaded={!!dataOrganizer && !isLoadingOrganizer && !isLoadingEvent}
          >
            <Card radius="sm" className="w-full md:px-3 md:py-2 xl:h-[300px]">
              <CardHeader>
                <h1 className="font-bold md:text-xl">Profile Organisasi</h1>
              </CardHeader>
              <CardBody className="flex-row gap-3 md:gap-5">
                <div className="h-fit">
                  <Image
                    src={dataOrganizer?.logo}
                    alt={dataOrganizer?.logo}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold md:text-xl">
                    {dataOrganizer?.organizerName}
                  </h1>
                  <Link
                    href={`mailto:${dataOrganizer?.email}`}
                    className="text-foreground-600 md:text-medium text-sm"
                  >
                    {dataOrganizer?.email}
                  </Link>
                  <span className="md:text-ms flex items-center gap-1 text-sm">
                    <MdDateRange />
                    {dayjs(dataOrganizer?.createdAt).format("YYYY-MMMM-DD")}
                  </span>
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  as={Link}
                  color="success"
                  className="w-full font-semibold md:w-1/3"
                  href={`https://wa.me/${formatePhone(dataOrganizer?.phone)}`}
                  target="_blank"
                >
                  <FaWhatsapp size={20} />
                  Hubungi Organisasi
                </Button>
              </CardFooter>
            </Card>
          </Skeleton>

          <Skeleton
            className="w-full rounded-sm"
            isLoaded={
              !!dataOrganizer &&
              !!dataRegency &&
              !isLoadingOrganizer &&
              !isLoadingRegency
            }
          >
            <Card radius="sm" className="w-full md:px-3 md:py-2 xl:h-[300px]">
              <CardHeader className="border-default-300 border-b-1">
                <h1 className="font-bold md:text-xl">Detail Organisasi</h1>
              </CardHeader>
              <CardBody>
                <section className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <h1 className="font-bold md:text-xl">Penanggung Jawab</h1>
                    <p className="text-foreground-600 md:text-medium flex items-center gap-1 text-sm">
                      <IoIosContact size={20} />
                      {dataOrganizer?.contactPerson}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold md:text-xl">
                      Deskripsi Organisasi
                    </h1>
                    <p className="text-foreground-600 md:text-medium text-sm">
                      {dataOrganizer?.descriptionOrganizer}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold md:text-xl">Lokasi</h1>
                    <div className="text-foreground-600 md:text-medium flex items-start gap-1 text-sm">
                      <FaLocationDot className="mt-1" />
                      <div className="flex flex-col">
                        <span>
                          {dataRegency?.[0]?.name},{" "}
                          {dataOrganizer?.location?.address}
                        </span>
                        <span className="">
                          {dataRegency?.[0]?.province?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </CardBody>
            </Card>
          </Skeleton>
        </div>

        <Skeleton
          className="w-full rounded-sm"
          isLoaded={!!dataEvent && !isLoadingEvent && !!dataOrganizer}
        >
          <Card radius="sm" className="w-full md:px-3 md:py-2 xl:h-[320px]">
            <CardHeader className="border-default-300 border-b-1">
              <h1 className="font-bold md:text-xl">Daftar Event</h1>
            </CardHeader>
            <CardBody className="flex flex-row flex-wrap gap-2 py-2">
              {dataEvent?.map((event: IEvent) => (
                <Card
                  isHoverable
                  key={event._id}
                  className="mx-auto my-2 w-fit md:mx-0"
                  radius="sm"
                  isPressable
                  as={Link}
                  href={`/events/${event.slug}`}
                  shadow="sm"
                >
                  <CardHeader className="items-center justify-center overflow-visible p-0">
                    <Image
                      alt={`${event?.name}`}
                      width={250}
                      height={150}
                      className="object-cover"
                      radius="sm"
                      src={`${event?.image}`}
                    />
                  </CardHeader>
                  <CardFooter className="text-small flex-col items-start">
                    <b>{event?.name}</b>
                    <p className="text-default-500">
                      Dibuat pada{" "}
                      {dayjs(event?.createdAt).format("DD MMMM YYYY")}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </CardBody>
          </Card>
        </Skeleton>
      </section>
    </main>
  );
};

export default ViewDetailOrganizer;
