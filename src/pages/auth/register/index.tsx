import LayoutAuth from "@/components/layouts/LayoutAuth";
import ViewRegister from "@/components/views/Auth/Register";
import React from "react";

const RegisterPage = () => {
  return (
    <LayoutAuth title="Register | SiVolunteer">
      <ViewRegister />
    </LayoutAuth>
  );
};

export default RegisterPage;
