import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDashboardAdmin from "@/components/views/Admin/Dashboard/ViewDashboardAdmin";
import React from "react";

const DashboardAdminPage = () => {
  return (
    <LayoutDashboard type="admin" title="Dashboard Admin">
      <ViewDashboardAdmin />
    </LayoutDashboard>
  );
};

export default DashboardAdminPage;
