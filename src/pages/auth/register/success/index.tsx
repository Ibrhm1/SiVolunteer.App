import LayoutAuth from "@/components/layouts/LayoutAuth";
import ViewRegisterSuccess from "@/components/views/Auth/RegisterSuccess";
import React from "react";


const RegisterSuccesPage = () => {
  return (
    <LayoutAuth title="Register Success | SiVolunteer">
      <ViewRegisterSuccess />
    </LayoutAuth>
  );
};

export default RegisterSuccesPage;
