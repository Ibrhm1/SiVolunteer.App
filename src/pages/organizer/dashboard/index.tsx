import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDashboardOrganizer from "@/components/views/Organizer/Dashboard/ViewDashboardOrganizer";

const DashboardOrganizerPage = () => {
  return (
    <LayoutDashboard
      title="Dashboard Organizer"
      description="Dashboard Organizer"
      type="organizer"
    >
      <ViewDashboardOrganizer />
    </LayoutDashboard>
  );
};

export default DashboardOrganizerPage;
