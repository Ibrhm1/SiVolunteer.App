import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewMembers from "@/components/views/Admin/Members";
import React from "react";

const MembersAdminPage = () => {
  return (
    <LayoutDashboard
      title="Members Admin Page"
      type="admin"
      description="Manage members here"
    >
      <ViewMembers />
    </LayoutDashboard>
  );
};

export default MembersAdminPage;
