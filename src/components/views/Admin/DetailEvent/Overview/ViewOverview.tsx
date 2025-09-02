import { Chip, Code, User } from "@heroui/react";
import React from "react";

interface PropTypes {
  description: string;
  image: string;
  organizerName: string;
  startDate: string;
  endDate: string;
  isPublish: string;
  isOnline: string;
  region: string;
  address: string;
}

const ViewOverview = (props: PropTypes) => {
  const {
    description,
    image,
    organizerName,
    startDate,
    endDate,
    isPublish,
    isOnline,
    region,
    address,
  } = props;

  return (
    <>
      <div className="bg-default-100 flex items-center rounded-lg p-2">
        <User
          avatarProps={{
            src: image,
          }}
          name={<h1 className="text-xl font-bold">{organizerName}</h1>}
        />
      </div>
      <section className="bg-default-100 mt-2 space-y-4 rounded-lg p-2">
        <div>
          <h3 className="text-start text-xl font-semibold">Description</h3>
          <p className="text-foreground-800 text-sm">{description}</p>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {isPublish ? (
            <Chip color="primary" variant="flat" size="md" radius="sm">
              Publish
            </Chip>
          ) : (
            <Chip color="danger" variant="flat" size="md" radius="sm">
              Private
            </Chip>
          )}
          {isOnline ? (
            <Chip color="secondary" variant="flat" size="md" radius="sm">
              Online
            </Chip>
          ) : (
            <p className="text-foreground-800 text-sm">
              {region}, {address}
            </p>
          )}
        </div>
        <div className="mt-1 flex flex-col gap-1 xl:flex-row">
          <Code color="primary" size="sm" className="w-fit">
            {startDate}
          </Code>
          <Code color="warning" size="sm" className="w-fit">
            {endDate}
          </Code>
        </div>
      </section>
    </>
  );
};

export default ViewOverview;
