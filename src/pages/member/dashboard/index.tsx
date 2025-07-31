import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDashboardAdmin from "@/components/views/Admin/Dashboard/ViewDashboardAdmin";
import React from "react";

const DashboardMemberPage = () => {
  return (
    <LayoutDashboard
      title="SiVolunteer | Dashboard Member"
      description="Dashboard Member"
      type="member"
    >
      <ViewDashboardAdmin />
    </LayoutDashboard>
  );
};

export default DashboardMemberPage;
