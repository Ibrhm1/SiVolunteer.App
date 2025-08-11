import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDashboardOrganizer from "@/components/views/Organizer/Dashboard/ViewDashboardOrganizer";

const DashboardOrganizerPage = () => {
  return (
    <LayoutDashboard
      title="Dashboard"
      description="Welcome to SiVolunteer"
      type="organizer"
    >
      <ViewDashboardOrganizer />
    </LayoutDashboard>
  );
};

export default DashboardOrganizerPage;
