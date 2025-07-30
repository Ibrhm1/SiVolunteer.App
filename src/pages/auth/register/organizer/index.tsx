import LayoutAuth from "@/components/layouts/LayoutAuth";
import ViewRegisterOrganizer from "@/components/views/Auth/Register/RegisterOrganizer";
import React from "react";

const RegisterOrganizerPage = () => {
  return (
    <LayoutAuth title="Register Organizer | SiVolunteer">
      <ViewRegisterOrganizer />
    </LayoutAuth>
  );
};

export default RegisterOrganizerPage;
