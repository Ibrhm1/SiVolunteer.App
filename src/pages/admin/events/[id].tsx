import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import DetailEvent from "@/components/views/Admin/DetailEvent";
import React from "react";

const DetailEventsAdminPage = () => {
  return (
    <LayoutDashboard
      title="Detail Event Admin"
      description="Manage Event Organizer"
      type="admin"
    >
      <DetailEvent />
    </LayoutDashboard>
  );
};

export default DetailEventsAdminPage;
