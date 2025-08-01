import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewOrganizer from "@/components/views/Admin/Organizers";
import React from "react";

const OrganizerAdminPage = () => {
  return (
    <LayoutDashboard
      title="Organizer Admin"
      description="Manage Organizer"
      type="admin"
    >
      <ViewOrganizer />
    </LayoutDashboard>
  );
};

export default OrganizerAdminPage;
