import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, notification, Skeleton, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

import { useAuth, useEvent } from "hooks";
import { IEvent } from "interfaces/event.interface";
import { DAY_FORMAT } from "common/constants";
import { EventCardAuthorAvatar } from "./event-card-author-avatar";
import { EventCardCoverImage } from "./event-card-cover-image";
import DeleteNotificationActions from "../delete-notification-actions";

type SoonEventCardProps = {
  event: IEvent;
  isLoading: boolean;
};

const formatEventTime = (startDate: string, endDate: string) => {
  const startDateMoment = moment(startDate);
  const endDateMoment = moment(endDate);

  if (startDateMoment.isSame(endDateMoment, "day")) {
    return startDateMoment.format("DD.MM.YYYY");
  }

  const formattedStartDate = startDateMoment.format(DAY_FORMAT);
  const formattedEndDate = endDateMoment.format(DAY_FORMAT);

  return `${formattedStartDate} - ${formattedEndDate}`;
};

export const EventCard: React.FC<SoonEventCardProps> = ({ event, isLoading }) => {
  const { id, title, description, images, author } = event;

  const navigate = useNavigate();
  const { isAdmin, user, isLoggedIn } = useAuth();
  const { deleteEvent } = useEvent();

  const canEdit = useMemo<boolean>(() => {
    if (!isLoggedIn) return false;

    if (!event || !event.author) return false;

    if (!user) return false;

    return isAdmin || event.author.id === user.id;
  }, [event, isAdmin, isLoggedIn, user]);

  const handleNavigateToEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate(`/events/${event.id}/edit`);
    },
    [event.id, navigate]
  );

  const handleDeleteIfNotCancelled = useCallback(() => {
    deleteEvent(event.id)
      .then(() => {
        notification.success({ message: "Подія успішла видалена" });
      })
      .catch((error) => {
        notification.error({
          message: "Не вдалося видалити подію",
          description: error.message,
        });
      });
  }, [deleteEvent, event.id]);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const notificationKey = `delete-${Date.now()}`;
      const closeNotification = () => notification.close(notificationKey);
      const notificationActions = (
        <DeleteNotificationActions
          onDelete={handleDeleteIfNotCancelled}
          closeNotification={closeNotification}
        />
      );

      notification.warning({
        message: "Подія буде видалена",
        description: "Скасуйте, якщо це сталося випадково",
        key: notificationKey,
        duration: 5,
        btn: notificationActions,
        // NOTE: empty span is used here to hide default close icon and disable ability to close
        closeIcon: <span />,
        onClose: handleDeleteIfNotCancelled,
      });
    },
    [handleDeleteIfNotCancelled]
  );

  const handleGoToDetails = useCallback(() => {
    navigate(`/events/${id}`);
  }, [id, navigate]);

  const actions = useMemo(() => {
    if (canEdit) {
      return [
        <Button type={"text"} key={"edit"} icon={<EditOutlined />} onClick={handleNavigateToEdit}>
          Редагувати
        </Button>,
        <Button type={"text"} key={"delete"} icon={<DeleteOutlined />} onClick={handleDelete}>
          Видалити
        </Button>,
      ];
    }

    return [];
  }, [canEdit, handleDelete, handleNavigateToEdit]);

  return (
    <Card
      hoverable
      actions={actions}
      title={title}
      onClick={handleGoToDetails}
      extra={
        <Typography.Text type={"secondary"}>
          {formatEventTime(event.startDate, event.endDate)}
        </Typography.Text>
      }
      cover={<EventCardCoverImage images={images} />}
    >
      <Skeleton loading={isLoading} active avatar>
        <Card.Meta
          style={{ height: 60 }}
          avatar={<EventCardAuthorAvatar author={author} />}
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
