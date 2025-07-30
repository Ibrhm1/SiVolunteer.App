import LayoutAuth from "@/components/layouts/LayoutAuth";
import ViewLogin from "@/components/views/Auth/Login";
import React from "react";

const LoginPage = () => {
  return (
    <LayoutAuth title="Login | SiVolunteer">
      <ViewLogin />
    </LayoutAuth>
  );
};

export default LoginPage;
