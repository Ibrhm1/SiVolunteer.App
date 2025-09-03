import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Skeleton,
  User,
} from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { HiOutlineHashtag } from "react-icons/hi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ViewDetailEventRegistration from "./DetailEventRegistration";
import { FaRegUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiAchievement } from "react-icons/gi";
import Link from "next/link";

const ViewDetailEvent = () => {
  const router = useRouter();
  const { dataDetailEventSlug, refetchDetailEventSlug, dataRegion } =
    useDetailEvent();

  useEffect(() => {
    if (router.isReady && dataDetailEventSlug) {
      refetchDetailEventSlug();
    }
  }, [router.isReady, dataDetailEventSlug]);

  return (
    <main className="w-full md:px-0">
      <header className="flex items-center p-2">
        <Skeleton
          className="h-6 w-full rounded-lg md:w-1/2 lg:w-1/4"
          isLoaded={!!dataDetailEventSlug?.name}
        >
          <Breadcrumbs size="sm">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/events">Events</BreadcrumbItem>
            <BreadcrumbItem>{dataDetailEventSlug?.name}</BreadcrumbItem>
          </Breadcrumbs>
        </Skeleton>
      </header>

      <section className="mt-2 flex w-full flex-col gap-0 lg:flex-row">
        <div className="mb-5 flex w-full flex-col justify-center px-3 lg:w-4/6 lg:px-6">
          <Skeleton
            isLoaded={!!dataDetailEventSlug?.image}
            className="w-full rounded-xl"
          >
            <Image
              src={dataDetailEventSlug?.image}
              alt="Cover"
              width={"100%"}
            />
          </Skeleton>
          <div className="mx-auto flex w-full items-center justify-between px-2 py-6">
            <Skeleton
              isLoaded={!!dataDetailEventSlug}
              className="w-full rounded-lg md:w-1/3"
            >
              <User
                avatarProps={{
                  src: dataDetailEventSlug?.createdBy?.logo,
                }}
                name={
                  <Link
                    href={`/search-organizers/${dataDetailEventSlug?.createdBy?._id}`}
                    className="text-medium font-semibold"
                  >
                    {dataDetailEventSlug?.createdBy?.organizerName}
                  </Link>
                }
              />
            </Skeleton>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton
              className="rounded-md"
              isLoaded={!!dataDetailEventSlug?.description}
            >
              <Card radius="md" shadow="lg" className="bg-default-50">
                <CardHeader>
                  <h1 className="text-xl font-semibold">Description</h1>
                </CardHeader>
                <CardBody>
                  <h2 className="text-foreground-900 lg:text-medium text-sm">
                    {dataDetailEventSlug?.description}
                  </h2>
                </CardBody>
              </Card>
            </Skeleton>
            <Skeleton
              isLoaded={!!dataDetailEventSlug?.requirements}
              className="rounded-lg"
            >
              <Card>
                <CardHeader>
                  <h1 className="text-xl font-semibold">Detail Event</h1>
                </CardHeader>
                <CardBody className="gap-2 space-y-3">
                  <div className="rounded-lg bg-[#E6E6E9] p-3 text-black">
                    <h1 className="font-semibold">Requirements</h1>
                    <h2 className="text-medium">
                      {dataDetailEventSlug?.requirements}
                    </h2>
                  </div>
                  <span className="flex w-fit items-center gap-2 rounded-lg bg-[#C0CCDD] px-3 text-black">
                    <FaRegUser /> Kouta :{" "}
                    {dataDetailEventSlug?.requiredVolunteers} Volunteers
                  </span>
                  <div className="px-3">
                    <h1 className="flex items-center font-semibold">
                      <GiAchievement /> Benefits
                    </h1>
                    <h2 className="text-foreground-900 lg:text-medium text-sm">
                      {dataDetailEventSlug?.benefits}
                    </h2>
                  </div>
                  <div className="px-3">
                    {dataDetailEventSlug?.isOnline ? (
                      <Chip
                        color="secondary"
                        variant="flat"
                        size="md"
                        radius="sm"
                        className="mt-2"
                      >
                        Acara ini dilakukan secara online
                      </Chip>
                    ) : (
                      <>
                        <h1 className="flex items-center font-semibold">
                          <FaLocationDot /> Lokasi
                        </h1>
                        <h2 className="text-foreground-900 lg:text-medium text-sm">
                          {dataRegion?.[0]?.name},{" "}
                          {dataDetailEventSlug?.location?.address},{" "}
                          {dataRegion?.[0]?.province?.name}
                        </h2>
                      </>
                    )}
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="flex flex-wrap gap-2 px-3">
                    {dataDetailEventSlug?.tags?.map((tag: string) => (
                      <Chip
                        key={tag}
                        radius="sm"
                        className="bg-[#D0CCD0] text-black capitalize"
                        variant="flat"
                        startContent={<HiOutlineHashtag className="-mr-1" />}
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </Skeleton>
          </div>
        </div>
        <div className="mb-5 px-3 lg:w-2/6 lg:px-6">
          <ViewDetailEventRegistration dataEvent={dataDetailEventSlug} />
        </div>
      </section>
    </main>
  );
};

export default ViewDetailEvent;
