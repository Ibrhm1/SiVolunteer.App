import { Tab, Tabs } from "@heroui/react";
import useViewDetailMyEvent from "./useViewDetailMyEvent";
import ViewImageTab from "./CurrentVolunteerTab";
import ViewDetailEventTab from "./DetailEventTab/ViewDetailEventTab";
import ViewCurrentVolunteerTab from "./CurrentVolunteerTab/ViewCurrentVolunteerTab";

const ViewDetailMyEvent = () => {
  const {
    dataMyEvent,
    refetchMyEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    handleUpdateEvent,
    handleUpdateDetail,
    dataDefaultRegion,
  } = useViewDetailMyEvent();

  return (
    <div>
      <Tabs size="sm">
        <Tab key="imageEvent" title="Image Event">
          <ViewImageTab
            currentImage={dataMyEvent?.image}
            isPendingUpdate={isPendingMutateUpdateEvent}
            isSuccessUpdate={isSuccessMutateUpdateEvent}
            onUpdate={handleUpdateEvent}
            refetchMyEvent={refetchMyEvent}
          />
        </Tab>
        <Tab key={"detailEvent"} title="Detail Event">
          <ViewDetailEventTab
            dataMyEvent={dataMyEvent}
            dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
            isPendingUpdate={isPendingMutateUpdateEvent}
            isSuccessUpdate={isSuccessMutateUpdateEvent}
            onUpdate={handleUpdateDetail}
            refetchMyEvent={refetchMyEvent}
          />
        </Tab>
        <Tab key={"requirementEvent"} title="Requirement">
          <ViewCurrentVolunteerTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ViewDetailMyEvent;
