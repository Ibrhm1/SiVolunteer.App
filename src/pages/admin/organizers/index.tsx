import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewOrganizer from "@/components/views/Admin/Organizers";
import React from "react";

const OrganizerAdminPage = () => {
  return (
    <LayoutDashboard
      description="List of all organizers"
      title="Organizer Admin"
      type="admin"
    >
      <ViewOrganizer />
    </LayoutDashboard>
  );
};

export default OrganizerAdminPage;
