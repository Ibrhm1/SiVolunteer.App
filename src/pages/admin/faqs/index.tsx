import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewFaq from "@/components/views/Admin/Faq";
import React from "react";

const FaqAdminPage = () => {
  return (
    <LayoutDashboard
      description="List of all Frequently Asked Questions"
      type="admin"
      title="Frequently Asked Questions"
    >
      <ViewFaq />
    </LayoutDashboard>
  );
};

export default FaqAdminPage;
