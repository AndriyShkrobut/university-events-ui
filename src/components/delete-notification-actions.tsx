import React, { useCallback } from "react";
import { Button, Space } from "antd";

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

export default DeleteNotificationActions;
