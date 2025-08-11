import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewProfile from "@/components/views/Organizer/Profile";

const ProfilePageOrganizer = () => {
  return (
    <LayoutDashboard title="Profile" type="organizer">
      <ViewProfile />
    </LayoutDashboard>
  );
};

export default ProfilePageOrganizer;
