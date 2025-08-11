import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewProfile from "@/components/views/Member/Profile";

const ProfilePageMember = () => {
  return (
    <LayoutDashboard title="Profile" type="member">
      <ViewProfile />
    </LayoutDashboard>
  );
};

export default ProfilePageMember;
