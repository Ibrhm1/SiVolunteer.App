import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewDetailCategory from "@/components/views/Admin/DetailCategory";

const DetailCategoryAdminPage = () => {
  return (
    <LayoutDashboard
      type="admin"
      title="Category Admin"
      description="List of all categories, create new banner, and manage exiting categories"
    >
      <ViewDetailCategory />
    </LayoutDashboard>
  );
};

export default DetailCategoryAdminPage;
