import useViewProfile from "./useViewProfile";
import ViewDetailProfile from "./DetailProfile";
import ViewLogoProfile from "./LogoProfile";
import { Tab, Tabs } from "@heroui/react";
import ViewUpdatePassword from "./UpdatePassword";

const ViewProfile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    refetchProfile,

    dataDefaultRegion,
  } = useViewProfile();

  return (
    <main>
      <Tabs variant="underlined" color="primary">
        <Tab key="profile" title="Profile">
          <section className="flex flex-col gap-2 md:flex-row" id="profile">
            <ViewLogoProfile
              currentImage={dataProfile?.logo}
              isPendingUpdate={isPendingUpdateProfile}
              isSuccessUpdate={isSuccessUpdateProfile}
              onUpdate={handleUpdateProfile}
              refetchProfile={refetchProfile}
            />
            <ViewDetailProfile
              onUpdate={handleUpdateProfile}
              dataDomicile={dataDefaultRegion?.data?.data[0]?.name}
              dataProfile={dataProfile}
              isPendingUpdate={isPendingUpdateProfile}
              isSuccessUpdate={isSuccessUpdateProfile}
              refetchProfile={refetchProfile}
            />
          </section>
        </Tab>
        <Tab key="password" title="Password">
          <ViewUpdatePassword />
        </Tab>
      </Tabs>
    </main>
  );
};

export default ViewProfile;
