import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewCategory from "@/components/views/Admin/Category/ViewCategory";

const CategoryAdminPage = () => {
  return (
    <LayoutDashboard
      type="admin"
      title="Category Admin"
      description="List of all categories, create new banner, and manage exiting categories"
    >
      <ViewCategory />
    </LayoutDashboard>
  );
};

export default CategoryAdminPage;
