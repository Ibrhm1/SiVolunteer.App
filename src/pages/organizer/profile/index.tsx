import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewProfile from "@/components/views/Organizer/Profile";

const ProfilePageOrganizer = () => {
  return (
    <LayoutDashboard
      title="Profile"
      description="Manage Profile"
      type="organizer"
    >
      <ViewProfile />
    </LayoutDashboard>
  );
};

export default ProfilePageOrganizer;
