import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, notification } from "antd";

import { Mode } from "common/constants";
import EventForm, { FormValues } from "components/event-form";
import { useEvent } from "hooks";
import { mapFormValuesToEvent } from "mappers/event.mapper";

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { createEvent } = useEvent();

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSubmit = useCallback(
    (values: FormValues) => {
      try {
        const eventData = mapFormValuesToEvent(values);

        return createEvent(eventData)
          .then(() => {
            notification.success({
              message: "Подія була успішно створена",
            });
            navigate(-1);
          })
          .catch((error) => {
            notification.error({
              message: "Помилка при створенні події",
              description: error.message,
            });
          });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [createEvent, navigate]
  );

  return (
    <Modal
      width={650}
      footer={false}
      title="Створити подію"
      onCancel={handleCancel}
      visible
      centered
    >
      <EventForm onCancel={handleCancel} onSubmit={handleSubmit} mode={Mode.CREATE} />
    </Modal>
  );
};

export default CreateEvent;
