import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import ViewCategory from "@/components/views/Admin/Category/ViewCategory";

const CategoryAdminPage = () => {
  return (
    <LayoutDashboard
      type="admin"
      title="Categories"
      description="List of all categories"
    >
      <ViewCategory />
    </LayoutDashboard>
  );
};

export default CategoryAdminPage;
