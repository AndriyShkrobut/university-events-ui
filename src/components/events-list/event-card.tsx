import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, notification, Popconfirm, Skeleton, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

import { useAuth, useEvent } from "hooks";
import { IEvent } from "interfaces/event.interface";
import { EventCardAuthorAvatar } from "./event-card-author-avatar";
import { EventCardCoverImage } from "./event-card-cover-image";

type SoonEventCardProps = {
  event: IEvent;
  isLoading: boolean;
};

export const EventCard: React.FC<SoonEventCardProps> = ({ event, isLoading }) => {
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

  const handleDelete = useCallback(() => {
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
  }, [handleDeleteIfNotCancelled]);

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
          okButtonProps={{ danger: true }}
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

type DeleteNotificationActionsProps = {
  onDelete(): void;
  closeNotification(): void;
};

const DeleteNotificationActions: React.FC<DeleteNotificationActionsProps> = ({
  onDelete,
  closeNotification,
}) => {
  const handleDelete = useCallback(() => {
    closeNotification();
    onDelete();
  }, [closeNotification, onDelete]);

  return (
    <Space size={"large"}>
      <Button type={"primary"} key={"confirm"} danger onClick={handleDelete}>
        Все одно видалити
      </Button>
      <Button key={"cancel"} onClick={closeNotification}>
        Скасувати
      </Button>
    </Space>
  );
};
