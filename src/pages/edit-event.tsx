import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, notification } from "antd";

import EventForm, { FormValues } from "components/event-form";
import { Mode } from "common/constants";
import { useEvent } from "hooks";
import { mapFormValuesToEvent } from "mappers/event.mapper";
import { IEvent } from "interfaces/event.interface";

const EditEvent: React.FC = () => {
  const navigate = useNavigate();

  const [event, setEvent] = useState<IEvent>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();
  const { updateEvent, getEventById } = useEvent();

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSubmit = useCallback(
    (values: FormValues) => {
      try {
        const eventId = Number(id);
        const eventData = mapFormValuesToEvent(values);

        return updateEvent(eventId, eventData)
          .then(() => {
            notification.success({
              message: "Подію успішно збережено",
            });
            navigate(-1);
          })
          .catch((error) => {
            notification.error({
              message: "Помилка при редагуванні події",
              description: error.message,
            });
          });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [id, navigate, updateEvent]
  );

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

  return (
    <Modal
      width={650}
      footer={false}
      title="Редагувати подію"
      onCancel={handleCancel}
      visible
      centered
    >
      <EventForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        mode={Mode.EDIT}
        event={event}
        isEventLoading={isLoading}
      />
    </Modal>
  );
};

export default EditEvent;
