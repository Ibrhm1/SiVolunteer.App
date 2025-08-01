import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewEventAdmin from "@/components/views/Admin/Events";
import React from "react";

const EventsAdminPage = () => {
  return (
    <LayoutDashboard
      title="Dashboard Event Admin"
      description="Manage Event Organizer"
      type="admin"
    >
      <ViewEventAdmin />
    </LayoutDashboard>
  );
};

export default EventsAdminPage;
