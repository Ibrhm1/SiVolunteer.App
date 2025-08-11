import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDetailCategory from "@/components/views/Admin/DetailCategory";

const DetailCategoryAdminPage = () => {
  return (
    <LayoutDashboard
      type="admin"
      title="Detail Category"
      description="Manage Category Update, Delete, etc."
    >
      <ViewDetailCategory />
    </LayoutDashboard>
  );
};

export default DetailCategoryAdminPage;
