import React from "react";
import { Modal } from "antd";
import EventForm from "components/event-form";
import { useNavigate } from "react-router-dom";
import { Mode } from "../common/constants";

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  return (
    <Modal
      width={650}
      footer={false}
      title="Створити подію"
      onCancel={handleCancel}
      visible
      centered
    >
      <EventForm onCancel={handleCancel} mode={Mode.CREATE} />
    </Modal>
  );
};

export default CreateEvent;
