import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDashboardMember from "@/components/views/Member/Dashboard/ViewDashboardMember";
import React from "react";

const DashboardMemberPage = () => {
  return (
    <LayoutDashboard
      type="member"
      title="Dashboard Member"
      description="Welcome to SiVolunteer"
    >
      <ViewDashboardMember />
    </LayoutDashboard>
  );
};

export default DashboardMemberPage;
