import { Chip } from "@heroui/react";
import React from "react";

interface PropTypes {
  requiredVolunteers: number;
  currentVolunteers: number;
  requirements: string;
  benefits: string;
}

const ViewRequirement = (props: PropTypes) => {
  const { benefits, currentVolunteers, requiredVolunteers, requirements } =
    props;

  return (
    <section className="flex flex-col gap-2">
      <div className="bg-default-100 rounded-xl p-2">
        <h1 className="text-xl font-semibold">Requirement</h1>
        <p className="text-sm">{requirements}</p>
      </div>
      <div className="bg-default-100 rounded-xl p-2">
        <h1 className="text-xl font-semibold">Benefits</h1>
        <p className="text-sm">{benefits}</p>
      </div>
      <div className="bg-default-100 flex items-center gap-2 rounded-xl p-2">
        <h1>Requirements</h1>
        <Chip color="secondary" variant="flat" size="sm">
          {requiredVolunteers}
        </Chip>
      </div>
      <div className="bg-default-100 flex items-center gap-2 rounded-xl p-2">
        <h1>Current Volunteers</h1>
        <Chip
          color={currentVolunteers === 0 ? "danger" : "success"}
          variant="flat"
          size="sm"
          radius="sm"
          className="text-sm"
        >
          {currentVolunteers}
        </Chip>
      </div>
    </section>
  );
};

export default ViewRequirement;
