import React from "react";
import { Button, Result } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Сторінки, яку ви шукаєте - не знайдено"
      extra={
        <Button type="primary" size={"large"} icon={<HomeFilled />} onClick={handleGoHome}>
          На головну
        </Button>
      }
    />
  );
};

export default NotFound;
