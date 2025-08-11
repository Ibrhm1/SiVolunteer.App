import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDetailFaq from "@/components/views/Admin/DetailFaq";

const DetailFaqAdminPage = () => {
  return (
    <LayoutDashboard
      title="Detail Faq"
      type="admin"
      description="Detail Faq Update, Delete, etc."
    >
      <ViewDetailFaq />
    </LayoutDashboard>
  );
};

export default DetailFaqAdminPage;
