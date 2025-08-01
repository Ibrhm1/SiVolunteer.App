import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewEventVolunteer from "@/components/views/Admin/EventVolunteer";
import ViewOrganizer from "@/components/views/Admin/Organizers";
import React from "react";

const EventVolunteerAdminPage = () => {
  return (
    <LayoutDashboard
      title="Event Volunteer Admin"
      description="Manage Event Volunteer"
      type="admin"
    >
      <ViewEventVolunteer />
    </LayoutDashboard>
  );
};

export default EventVolunteerAdminPage;
