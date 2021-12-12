import React, { useEffect } from "react";
import { Col, notification, Row } from "antd";
import SoonEventsList from "components/soon-events-list";
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
        <Col sm={24} md={16} xxl={18}>
          <SoonEventsList events={events} isLoading={isLoading} />
        </Col>
        <Col sm={24} md={8} xxl={6}>
          <NewEventsList events={events} isLoading={isLoading} />
        </Col>
      </Row>
      <Outlet />
    </React.Fragment>
  );
};

export default Home;
