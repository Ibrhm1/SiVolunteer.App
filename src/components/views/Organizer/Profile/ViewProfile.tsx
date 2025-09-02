import useViewProfile from "./useViewProfile";
import ViewDetailProfile from "./DetailProfile";
import ViewLogoProfile from "./LogoProfile";
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import ViewUpdatePassword from "./UpdatePassword";
import dayjs from "dayjs";
import { GrStatusGood } from "react-icons/gr";

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
          <section className="flex flex-col gap-2" id="profile">
            <div className="flex w-full flex-col gap-2 md:flex-row">
              <ViewLogoProfile
                currentImage={dataProfile?.logo}
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
            </div>
            <Card>
              <CardBody className="grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h1 className="text-xl font-semibold">Date Established</h1>
                  <p className="text-foreground text-sm">
                    {dayjs(dataProfile?.dateEstablished).format("DD MMMM YYYY")}
                  </p>
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Location</h1>
                  <p className="text-foreground text-sm">
                    {dataProfile?.location.address}
                  </p>
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Active</h1>
                  <p>
                    {dataProfile?.active ? (
                      <GrStatusGood className="mx-auto size-5 w-fit text-teal-500" />
                    ) : (
                      "No"
                    )}
                  </p>
                </div>
              </CardBody>
            </Card>
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
