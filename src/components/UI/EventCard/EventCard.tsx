import { IEvent } from "@/types/Event";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Skeleton,
} from "@heroui/react";
import useEventCard from "./useEventCard";
import dayjs from "dayjs";
import { IRegency } from "@/types/region";
import { MdDateRange } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface PropTypes {
  className?: string;
  event?: IEvent;
  isLoading?: boolean;
  key?: string;
}

const EventCard = (props: PropTypes) => {
  const { className, event, isLoading, key } = props;
  const { dataOrganizer, dataRegion } = useEventCard(
    `${event?.createdBy}`,
    `${event?.location?.region}`,
  );

  return (
    <Card
      as={Link}
      className={cn(className, "h-fit cursor-pointer")}
      href={`/events/${event?.slug}`}
      isPressable={isLoading ? false : true}
      key={key}
      shadow="sm"
      isDisabled={isLoading}
    >
      {!isLoading ? (
        <>
          <CardHeader className="flex justify-center">
            <Image
              src={`${event?.image}`}
              alt={`${event?.name}`}
              width={400}
              height={200}
              className="object-cover"
            />
          </CardHeader>
          <CardBody className="h-28">
            <h2 className="text-medium font-semibold md:text-lg">
              {event?.name}
            </h2>
            <p className="md:text-medium text-foreground-700 text-sm">
              {dataOrganizer?.organizerName}
            </p>
          </CardBody>
          <CardFooter className="items-center lg:h-24">
            {event?.isOnline ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <MdDateRange />
                  <p className="text-foreground text-sm">
                    {dayjs(`${event?.startDate}`).format("DD MMMM YYYY")}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <IoLocationSharp className="text-medium" />
                  <p className="text-foreground text-sm">
                    <Chip size="sm" radius="sm" variant="flat" color="primary">
                      Online
                    </Chip>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <MdDateRange />
                  <p className="text-foreground text-sm">
                    {dayjs(`${event?.startDate}`).format("DD MMMM YYYY")}
                  </p>
                </div>
                <div className="flex items-start gap-1">
                  <IoLocationSharp size={15} className="mt-1" />
                  <p className="text-foreground w-fit text-sm">
                    {dataRegion?.map((region: IRegency) => region?.name)},{" "}
                    {event?.location?.address}
                  </p>
                </div>
              </div>
            )}
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader className="flex justify-center">
            <Skeleton className="h-48 w-full rounded-lg" />
          </CardHeader>
          <CardBody className="h-28">
            <Skeleton className="mb-2 h-8 w-full rounded-lg" />
            <Skeleton className="h-6 w-full rounded-lg" />
          </CardBody>
          <CardFooter className="h-20 items-start">
            <Skeleton className="h-10 w-full rounded-lg" />
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default EventCard;
