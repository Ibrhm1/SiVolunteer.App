import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewMyParticipation from "@/components/views/Member/MyParticipation";
const MyParticipationPageMember = () => {
  return (
    <LayoutDashboard
      title="My Participation"
      description="My Participation"
      type="member"
    >
      <ViewMyParticipation />
    </LayoutDashboard>
  );
};

export default MyParticipationPageMember;
