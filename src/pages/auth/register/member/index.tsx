import LayoutAuth from "@/components/layouts/LayoutAuth";
import ViewRegisterMember from "@/components/views/Auth/Register/RegisterMember/ViewRegisterMember";
import React from "react";

const RegisterMemberPage = () => {
  return (
    <LayoutAuth title="Register Member | SiVolunteer">
      <ViewRegisterMember />
    </LayoutAuth>
  );
};

export default RegisterMemberPage;
