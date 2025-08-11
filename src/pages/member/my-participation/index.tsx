import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewMyParticipation from "@/components/views/Member/MyParticipation";
const MyParticipationPageMember = () => {
  return (
    <LayoutDashboard
      title="My Participation"
      description="List of my participation events volunteer"
      type="member"
    >
      <ViewMyParticipation />
    </LayoutDashboard>
  );
};

export default MyParticipationPageMember;
