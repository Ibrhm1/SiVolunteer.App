import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewProfile from "@/components/views/Admin/Profile";

const ProfilePageAdmin = () => {
  return (
    <LayoutDashboard title="Profile" type="admin">
      <ViewProfile />
    </LayoutDashboard>
  );
};

export default ProfilePageAdmin;
