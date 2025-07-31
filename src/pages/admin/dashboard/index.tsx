import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDashboardAdmin from "@/components/views/Admin/Dashboard/ViewDashboardAdmin";
import React from "react";

const DashboardAdminPage = () => {
  return (
    <LayoutDashboard
      title="SiVolunteer | Dashboard Admin"
      description="Dashboard Admin"
      type="admin"
    >
      <ViewDashboardAdmin />
    </LayoutDashboard>
  );
};

export default DashboardAdminPage;
