import React, { useEffect } from "react";
import { Col, Row, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import LoginForm from "components/login-form";

import "./login.less";
import useAuth from "../hooks/use-auth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;

    navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <Row align={"middle"} justify={"center"} className={"login"}>
      <Col xs={24}>
        <Row justify={"center"}>
          <Col>
            <Typography.Title>Увійти в Обліковий Запис</Typography.Title>
          </Col>
        </Row>
        <Row justify={"center"} className={"login__form-row"}>
          <Col xs={24} sm={22} md={18} lg={12} xl={10} xxl={8}>
            <LoginForm />
          </Col>
        </Row>
        <Row justify={"center"} className={"login__help-text"}>
          <Col>
            <Typography.Text>
              Не має облікового запису? <Link to={"/register"}>Створіть!</Link>
            </Typography.Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
