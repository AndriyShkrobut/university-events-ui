import React, { useCallback, useMemo } from "react";
import { Button, Card, notification, Popconfirm, Skeleton, Typography } from "antd";

import { IEvent } from "interfaces/event.interface";
import { SoonEventCardAuthorAvatar } from "./soon-event-card-author-avatar";
import { SoonEventCardCoverImage } from "./soon-event-card-cover-image";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useEvent from "../../hooks/use-event";

type SoonEventCardProps = {
  event: IEvent;
  isLoading: boolean;
};

export const SoonEventCard: React.FC<SoonEventCardProps> = ({ event, isLoading }) => {
  const { title, description, images, author } = event;

  const navigate = useNavigate();
  const { isAdmin, user, isLoggedIn } = useAuth();
  const { deleteEvent } = useEvent();

  const canEdit = useMemo<boolean>(() => {
    if (!isLoggedIn) return false;

    if (!event || !event.author) return false;

    if (!user) return false;

    return isAdmin || event.author.id === user.id;
  }, [event, isAdmin, isLoggedIn, user]);

  const handleNavigateToEdit = useCallback(() => {
    navigate(`/events/${event.id}/edit`);
  }, [event.id, navigate]);

  const handleDelete = useCallback(() => {
    deleteEvent(event.id)
      .then(() => {
        notification.success({ message: "Подія успішла видалена" });
      })
      .catch((error) => {
        notification.error({ message: "Не вдалося видалити подію", description: error.message });
      });
  }, [deleteEvent, event.id]);

  const actions = useMemo(() => {
    if (canEdit) {
      return [
        <Button type={"text"} key={"edit"} icon={<EditOutlined />} onClick={handleNavigateToEdit}>
          Редагувати
        </Button>,
        <Popconfirm
          key={"delete"}
          title={"Ви впевнені, що хочете видалити подію?"}
          onConfirm={handleDelete}
          okText={"Так"}
          cancelText={"Скасувати"}
        >
          <Button type={"text"} key={"delete"} icon={<DeleteOutlined />}>
            Видалити
          </Button>
        </Popconfirm>,
      ];
    }

    return [];
  }, [canEdit, handleDelete, handleNavigateToEdit]);

  const formatEventTime = (startDate: string, endDate: string) => {
    const startDateMoment = moment(startDate);
    const endDateMoment = moment(endDate);

    if (startDateMoment.isSame(endDateMoment, "day")) {
      return startDateMoment.format("DD.MM.YYYY");
    }

    const formattedStartDate = startDateMoment.format("DD.MM.YYYY");
    const formattedEndDate = endDateMoment.format("DD.MM.YYYY");

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  return (
    <Card
      hoverable
      actions={actions}
      title={title}
      extra={
        <Typography.Text type={"secondary"}>
          {formatEventTime(event.startDate, event.endDate)}
        </Typography.Text>
      }
      cover={<SoonEventCardCoverImage images={images} />}
    >
      <Skeleton loading={isLoading} active avatar>
        <Card.Meta
          avatar={<SoonEventCardAuthorAvatar author={author} />}
          description={
            <Typography.Paragraph type={"secondary"} ellipsis={{ rows: 2 }}>
              {description}
            </Typography.Paragraph>
          }
        />
      </Skeleton>
    </Card>
  );
};
