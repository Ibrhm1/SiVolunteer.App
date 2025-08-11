import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewEventAdmin from "@/components/views/Admin/Events";
import React from "react";

const EventsAdminPage = () => {
  return (
    <LayoutDashboard
      title="Events Organizer"
      description="List of all Events Organizer"
      type="admin"
    >
      <ViewEventAdmin />
    </LayoutDashboard>
  );
};

export default EventsAdminPage;
