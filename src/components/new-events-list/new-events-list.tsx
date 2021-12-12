import React, { useMemo } from "react";
import { List, Typography } from "antd";

import { IEvent } from "interfaces/event.interface";
import { NewEventListItem } from "./new-event-list-item";

type NewEventsListProps = {
  events: IEvent[];
  isLoading: boolean;
};

export const NewEventsList: React.FC<NewEventsListProps> = ({ events, isLoading }) => {
  const eventsToRender = useMemo<IEvent[]>(() => {
    // NOTE: array of empty objects is placeholder for skeleton
    return isLoading ? new Array(6).fill({}) : events;
  }, [events, isLoading]);

  return (
    <React.Fragment>
      <Typography.Title>Нові події</Typography.Title>
      <List
        itemLayout={"horizontal"}
        dataSource={eventsToRender}
        renderItem={(item) => <NewEventListItem event={item} isLoading={isLoading} />}
      />
    </React.Fragment>
  );
};
