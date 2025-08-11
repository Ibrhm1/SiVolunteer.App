import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewMyEvents from "@/components/views/Organizer/MyEvents";
import React from "react";

const MyEventOrganizerPage = () => {
  return (
    <LayoutDashboard
      type="organizer"
      title="My Events"
      description="List of all my events"
    >
      <ViewMyEvents />
    </LayoutDashboard>
  );
};

export default MyEventOrganizerPage;
