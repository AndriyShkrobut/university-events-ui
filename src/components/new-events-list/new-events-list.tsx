import React, { useMemo } from "react";
import { List, Typography } from "antd";

import { IEvent } from "interfaces/event.interface";
import { NewEventListItem } from "./new-event-list-item";
import moment from "moment";

type NewEventsListProps = {
  events: IEvent[];
  isLoading: boolean;
};

export const NewEventsList: React.FC<NewEventsListProps> = ({ events, isLoading }) => {
  const eventsToRender = useMemo<IEvent[]>(() => {
    // NOTE: array of empty objects is placeholder for skeleton
    if (isLoading) {
      new Array(6).fill({});
    }

    const sortedEvents = events.slice(0, 10).sort((left, right) => {
      const leftMoment = moment.utc(left.createDate).local();
      const rightMoment = moment.utc(right.createDate).local();

      return rightMoment.diff(leftMoment);
    });

    return sortedEvents;
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
