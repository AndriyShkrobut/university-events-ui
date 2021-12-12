import React from "react";
import { List, Skeleton } from "antd";

import { IEvent } from "interfaces/event.interface";

type NewEventListItemProps = {
  event: IEvent;
  isLoading: boolean;
};

export const NewEventListItem: React.FC<NewEventListItemProps> = ({ event, isLoading }) => {
  const { title, description } = event;

  return (
    <List.Item>
      <Skeleton loading={isLoading} active>
        <List.Item.Meta title={title} description={description} />
      </Skeleton>
    </List.Item>
  );
};
