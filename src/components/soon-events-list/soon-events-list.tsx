import React, { useMemo } from "react";
import { Col, Empty, Row, Typography } from "antd";

import { IEvent } from "interfaces/event.interface";
import { SoonEventCard } from "./soon-event-card";

type SoonEventsListProps = {
  events: IEvent[];
  isLoading: boolean;
};

export const SoonEventsList: React.FC<SoonEventsListProps> = ({ events = [], isLoading }) => {
  const isEmpty = useMemo<boolean>(
    () => events.length === 0 && !isLoading,
    [events.length, isLoading]
  );

  const eventsToRender = useMemo<IEvent[]>(() => {
    // NOTE: array of empty objects is placeholder for skeleton
    return isLoading ? new Array(10).fill({}) : events;
  }, [events, isLoading]);

  return (
    <React.Fragment>
      <Typography.Title>Всі події</Typography.Title>
      <Row gutter={[16, 16]} align={"stretch"}>
        {!isEmpty ? (
          eventsToRender.map((item, index) => (
            <Col key={item.id || index} xs={24} lg={12}>
              <SoonEventCard event={item} isLoading={isLoading} />
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
