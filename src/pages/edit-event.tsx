import React from "react";
import { useNavigate } from "react-router-dom";

import { Modal } from "antd";
import EventForm from "components/event-form";
import { Mode } from "common/constants";

const EditEvent: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Modal
      width={650}
      footer={false}
      title="Редагувати подію"
      onCancel={handleCancel}
      visible
      centered
    >
      <EventForm onCancel={handleCancel} mode={Mode.EDIT} />
    </Modal>
  );
};

export default EditEvent;
