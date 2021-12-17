import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  notification,
  Row,
  Skeleton,
  Tooltip,
  Typography,
} from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined, TeamOutlined } from "@ant-design/icons";
import moment from "moment";

import { DAY_FORMAT, TIME_FORMAT } from "common/constants";
import NewEventsList from "components/new-events-list";
import { useAuth, useEvent } from "hooks";
import { IEvent } from "interfaces/event.interface";
import DeleteNotificationActions from "components/delete-notification-actions";
import UserProfileAvatar from "components/user-profile-avatar";

const formatEventTime = (startDate: string, endDate: string) => {
  const startDateMoment = moment.utc(startDate).local();
  const endDateMoment = moment.utc(endDate).local();

  if (startDateMoment.isSame(endDateMoment, "day")) {
    const formattedDay = startDateMoment.format(DAY_FORMAT);
    const formattedStartTime = startDateMoment.format(TIME_FORMAT);
    const formattedEndTime = endDateMoment.format(TIME_FORMAT);

    return `${formattedDay} ${formattedStartTime} - ${formattedEndTime}`;
  }

  const formattedStartDate = startDateMoment.format(DAY_FORMAT);
  const formattedEndDate = endDateMoment.format(DAY_FORMAT);

  return `${formattedStartDate} - ${formattedEndDate}`;
};

const EventDetails: React.FC = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState<IEvent>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();
  const { events, getAllEvents, getEventById, deleteEvent, visitEvent, unVisitEvent } = useEvent();
  const { isAdmin, isLoggedIn, user } = useAuth();

  useEffect(() => {
    setIsLoading(true);

    const eventId = Number(id);

    getEventById(eventId)
      .then((data) => {
        setEvent(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getEventById, id]);

  useEffect(() => {
    getAllEvents().catch((error) => {
      notification.error({
        message: "Помилка при отриманні постів",
        description: error.message,
      });
    });
  }, [getAllEvents]);

  const handleVisitEvent = useCallback(() => {
    const eventId = Number(id);

    visitEvent(eventId)
      .then(() => {
        return getEventById(eventId);
      })
      .then((data) => {
        setEvent(data);

        notification.success({ message: "Ви додані в список гостей" });
      })
      .catch(() => {
        notification.error({
          message: "Не вдалося добавити до списку гостей. Спробуйте ще раз",
        });
      });
  }, [getEventById, id, visitEvent]);

  const handleUnVisitEvent = useCallback(() => {
    const eventId = Number(id);

    unVisitEvent(eventId)
      .then(() => {
        return getEventById(eventId);
      })
      .then((data) => {
        setEvent(data);

        notification.success({ message: "Ви видалені з списку гостей" });
      })
      .catch(() => {
        notification.error({
          message: "Не вдалося видалити з списку гостей. Спробуйте ще раз",
        });
      });
  }, [getEventById, id, unVisitEvent]);

  const eventDate = useMemo(() => {
    if (!event || !event.startDate || !event.endDate) {
      return "";
    }

    return formatEventTime(event.startDate, event.endDate);
  }, [event]);

  const isAlreadyVisiting = useMemo(() => {
    if (!event || !event.guests || !user) return false;

    return event.guests.find((item) => item.guest.id === user.id);
  }, [event, user]);

  const canEdit = useMemo<boolean>(() => {
    if (!isLoggedIn) return false;

    if (!event || !event.author) return false;

    if (!user) return false;

    return isAdmin || event.author.id === user.id;
  }, [event, isAdmin, isLoggedIn, user]);

  const handleNavigateToEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const eventId = Number(id);
      navigate(`/events/${eventId}/edit`);
    },
    [id, navigate]
  );

  const handleDeleteIfNotCancelled = useCallback(() => {
    const eventId = Number(id);

    deleteEvent(eventId)
      .then(() => {
        notification.success({ message: "Подія успішла видалена" });
        navigate("/");
      })
      .catch((error) => {
        notification.error({
          message: "Не вдалося видалити подію",
          description: error.message,
        });
      });
  }, [deleteEvent, id, navigate]);

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

  const visitButton = useMemo(() => {
    if (!user) return null;

    if (isAlreadyVisiting) {
      return (
        <Tooltip title={"Натисніть, щоб ми видалили вас з списку гостей"}>
          <Button
            type={"primary"}
            size={"large"}
            icon={<CheckOutlined />}
            onClick={handleUnVisitEvent}
          >
            Ви відвідаєте цю подію
          </Button>
        </Tooltip>
      );
    } else {
      return (
        <Button type={"primary"} size={"large"} icon={<TeamOutlined />} onClick={handleVisitEvent}>
          Відвідаю
        </Button>
      );
    }
  }, [handleUnVisitEvent, handleVisitEvent, isAlreadyVisiting, user]);

  return (
    <React.Fragment>
      <Row justify={"center"} align={"top"} gutter={[32, 32]}>
        <Col xs={24} xl={18}>
          {!isLoading && event ? (
            <Card
              title={
                <Typography.Title level={2} ellipsis={{ tooltip: true }}>
                  {event.title}
                </Typography.Title>
              }
              actions={actions}
              extra={visitButton}
              cover={
                <Carousel autoplaySpeed={5000} adaptiveHeight autoplay>
                  {event.images.map((item) => (
                    <img key={item.id} src={item.image.url} alt={"Event Image"} />
                  ))}
                </Carousel>
              }
            >
              <React.Fragment>
                <Typography.Title level={3}>Опис</Typography.Title>
                <Typography.Paragraph>{event.description}</Typography.Paragraph>
                <Divider />
                <Row align={"middle"} gutter={[16, 16]}>
                  <Col xs={24} lg={12}>
                    <Typography.Title
                      level={4}
                      ellipsis={true}
                    >{`Коли: ${eventDate}`}</Typography.Title>
                    <Typography.Title
                      level={4}
                      ellipsis={true}
                    >{`Де: ${event.location}`}</Typography.Title>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Typography.Title level={4} ellipsis={true}>
                      Організатор: <UserProfileAvatar user={event.organizer} />
                    </Typography.Title>
                    <Typography.Title
                      level={4}
                      ellipsis={true}
                    >{`Категорія: ${event.category.name}`}</Typography.Title>
                  </Col>
                </Row>
              </React.Fragment>
            </Card>
          ) : (
            <Skeleton active avatar paragraph={{ rows: 20 }} />
          )}
        </Col>
        <Col xs={24} xl={6}>
          <NewEventsList events={events} isLoading={isLoading} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EventDetails;
