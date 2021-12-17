import React from "react";
import { Col, List, Row, Skeleton, Typography } from "antd";

import { IEvent } from "interfaces/event.interface";
import moment from "moment";
import { DAY_FORMAT } from "../../common/constants";
import { useNavigate } from "react-router-dom";

type NewEventListItemProps = {
  event: IEvent;
  isLoading: boolean;
};

const formatEventTime = (createdDate: string) => {
  const createdDateMoment = moment(createdDate);

  return createdDateMoment.format(DAY_FORMAT);
};

export const NewEventListItem: React.FC<NewEventListItemProps> = ({ event, isLoading }) => {
  const { title, description } = event;
  const navigate = useNavigate();

  const handleGoToDetails = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <List.Item onClick={handleGoToDetails} style={{ cursor: "pointer" }}>
      <Skeleton loading={isLoading} active>
        <List.Item.Meta
          title={
            <Row justify={"space-between"} align={"top"}>
              <Col flex={0} span={18}>
                <Typography.Text ellipsis={{ tooltip: true }}>{title}</Typography.Text>
              </Col>
              <Col flex={0}>
                <Typography.Paragraph type={"secondary"}>
                  {formatEventTime(event.createDate)}
                </Typography.Paragraph>
              </Col>
            </Row>
          }
          description={
            <Typography.Paragraph type={"secondary"} ellipsis={{ tooltip: true }}>
              {description}
            </Typography.Paragraph>
          }
        />
      </Skeleton>
    </List.Item>
  );
};
