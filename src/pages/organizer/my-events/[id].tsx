import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDetailMyEvent from "@/components/views/Organizer/DetailMyEvent";
import React from "react";

const MyEventOrganizerPage = () => {
  return (
    <LayoutDashboard
      type="organizer"
      title="Detail My Event"
      description="Manage My Event Update, Delete, etc."
    >
      <ViewDetailMyEvent />
    </LayoutDashboard>
  );
};

export default MyEventOrganizerPage;
