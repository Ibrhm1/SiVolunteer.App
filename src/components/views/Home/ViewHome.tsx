import { useEffect } from "react";
import ViewHomeBanners from "./HomeBanners";
import ViewHomeInfo from "./HomeInfo";
import ViewHomeListEvents from "./HomeListEvents";
import useViewHome from "./useViewHome";

const ViewHome = () => {
  const { dataEvents, isLoadingEvents } = useViewHome();

  return (
    <main className="w-full">
      <ViewHomeBanners />
      <ViewHomeInfo />
      <ViewHomeListEvents dataEvents={dataEvents} isLoading={isLoadingEvents} />
    </main>
  );
};

export default ViewHome;
