import LayoutLandingPage from "@/components/layouts/LayoutLandingPage";
import ViewEvents from "@/components/views/Events";

const index = () => {
  return (
    <LayoutLandingPage title="Events">
      <ViewEvents />
    </LayoutLandingPage>
  );
};

export default index;
