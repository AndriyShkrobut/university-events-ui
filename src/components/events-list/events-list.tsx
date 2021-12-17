import React, { useMemo } from "react";
import { Col, Empty, Row, Typography } from "antd";

import { IEvent } from "interfaces/event.interface";
import { EventCard } from "./event-card";
import moment from "moment";

type SoonEventsListProps = {
  events: IEvent[];
  isLoading: boolean;
};

export const EventsList: React.FC<SoonEventsListProps> = ({ events = [], isLoading }) => {
  const isEmpty = useMemo<boolean>(
    () => events.length === 0 && !isLoading,
    [events.length, isLoading]
  );

  const eventsToRender = useMemo<IEvent[]>(() => {
    // NOTE: array of empty objects is placeholder for skeleton
    if (isLoading) {
      new Array(10).fill({});
    }

    const sortedEvents = events.sort((left, right) => {
      const leftMoment = moment.utc(left.startDate).local();
      const rightMoment = moment.utc(right.startDate).local();

      return leftMoment.diff(rightMoment);
    });

    return sortedEvents;
  }, [events, isLoading]);

  return (
    <React.Fragment>
      <Typography.Title>Всі події</Typography.Title>
      <Row gutter={[16, 16]}>
        {!isEmpty ? (
          eventsToRender.map((item, index) => (
            <Col key={item.id || index} xs={24} xl={12}>
              <EventCard event={item} isLoading={isLoading} />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty description={"Тут поки що нічого немає..."} />
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};
