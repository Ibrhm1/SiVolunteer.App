import useViewProfile from "./useViewProfile";
import ViewDetailProfile from "./DetailProfile";
import ViewProfilePicture from "./ProfilePicture";
import { Tab, Tabs } from "@heroui/react";
import ViewUpdatePassword from "./UpdatePassword";

const ViewProfile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    refetchProfile,
  } = useViewProfile();

  return (
    <main>
      <Tabs variant="underlined" color="primary">
        <Tab key="profile" title="Profile">
          <section className="flex flex-col gap-2 md:flex-row">
            <ViewProfilePicture
              currentImage={dataProfile?.profilePicture}
              isPendingUpdate={isPendingUpdateProfile}
              isSuccessUpdate={isSuccessUpdateProfile}
              onUpdate={handleUpdateProfile}
              refetchProfile={refetchProfile}
            />
            <ViewDetailProfile
              onUpdate={handleUpdateProfile}
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
