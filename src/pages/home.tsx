import React, { useEffect } from "react";
import { Col, notification, Row } from "antd";
import EventsList from "components/events-list";
import NewEventsList from "components/new-events-list";
import useEvent from "hooks/use-event";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  const { events, isLoading, getAllEvents } = useEvent();

  useEffect(() => {
    getAllEvents().catch((error) => {
      notification.error({
        message: "Помилка при отриманні постів",
        description: error.message,
      });
    });
  }, [getAllEvents]);

  return (
    <React.Fragment>
      <Row justify={"center"} align={"top"} gutter={[32, 32]}>
        <Col xs={24} xl={18}>
          <EventsList events={events} isLoading={isLoading} />
        </Col>
        <Col xs={24} xl={6}>
          <NewEventsList events={events} isLoading={isLoading} />
        </Col>
      </Row>
      <Outlet />
    </React.Fragment>
  );
};

export default Home;
