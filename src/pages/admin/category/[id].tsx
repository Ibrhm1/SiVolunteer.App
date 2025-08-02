import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDetailCategory from "@/components/views/Admin/DetailCategory";

const DetailCategoryAdminPage = () => {
  return (
    <LayoutDashboard
      type="admin"
      title="Detail Category"
      description="Manage Category"
    >
      <ViewDetailCategory />
    </LayoutDashboard>
  );
};

export default DetailCategoryAdminPage;
