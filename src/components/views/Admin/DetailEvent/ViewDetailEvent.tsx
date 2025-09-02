import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import useViewDetailEvent from "./useViewDetailEvent";
import { HiMiniHashtag } from "react-icons/hi2";
import dayjs from "dayjs";
import ViewOverview from "./Overview";
import ViewRequirement from "./Requirement";

const ViewDetailEvent = () => {
  const {
    dataEvent,
    dataDefaultRegion,
    isPendingDataEvent,
    isPendingDefaultRegion,
  } = useViewDetailEvent();

  const startDate = dayjs(dataEvent?.startDate).format("YYYY-MM-DD HH:mm:ss");
  const endDate = dayjs(dataEvent?.startDate).format("YYYY-MM-DD HH:mm:ss");

  return (
    <div className="mt-5 w-full gap-0">
      <Skeleton
        className="mb-2 h-10 w-fit rounded-lg"
        isLoaded={!isPendingDataEvent}
      >
        <h1 className="text-xl font-bold md:text-3xl">{dataEvent?.name}</h1>
      </Skeleton>
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-center overflow-hidden rounded-xl">
          <Skeleton isLoaded={!isPendingDataEvent} className="rounded-lg">
            <Image
              alt="Cover"
              src={dataEvent?.image}
              height={400}
              width={"100%"}
              className="aspect-video object-cover"
            />
          </Skeleton>
        </div>
        <Card className="px-2 py-2">
          <CardBody className="min-h-96 flex-col">
            <Tabs aria-label="Dynamic tabs">
              <Tab key={"overview"} title="Overview">
                <Skeleton
                  isLoaded={!isPendingDataEvent}
                  className="h-40 rounded-lg"
                >
                  <ViewOverview
                    endDate={`${endDate}`}
                    isOnline={dataEvent?.isOnline}
                    isPublish={dataEvent?.isPublish}
                    region={dataDefaultRegion?.data.data[0].name}
                    address={dataEvent?.location?.address}
                    startDate={`${startDate}`}
                    image={dataEvent?.createdBy?.logo}
                    description={dataEvent?.description}
                    organizerName={dataEvent?.createdBy.organizerName}
                  />
                </Skeleton>
              </Tab>
              <Tab key={"requirement"} title="Requirement">
                <Skeleton
                  isLoaded={!isPendingDataEvent}
                  className="h-full rounded-lg"
                >
                  <ViewRequirement
                    benefits={dataEvent?.benefits}
                    currentVolunteers={dataEvent?.currentVolunteers.length}
                    requiredVolunteers={dataEvent?.requiredVolunteers}
                    requirements={dataEvent?.requirements}
                  />
                </Skeleton>
              </Tab>
            </Tabs>
          </CardBody>
          <CardFooter className="flex items-center gap-3">
            <Skeleton className="rounded-lg" isLoaded={!isPendingDefaultRegion}>
              <h1 className="text-md font-semibold">
                {dataEvent?.category?.name}
              </h1>
            </Skeleton>
            <Skeleton className="rounded-lg" isLoaded={!isPendingDataEvent}>
              <div className="flex flex-wrap gap-2">
                {dataEvent?.tags.map((tag: string) => (
                  <Chip
                    className="text-sm font-bold"
                    size="sm"
                    key={tag}
                    variant="flat"
                    startContent={
                      <HiMiniHashtag
                        size={16}
                        className="text-default rounded-full bg-amber-100"
                      />
                    }
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            </Skeleton>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ViewDetailEvent;
