import React from "react";
import RegisterForm from "../components/register-form";
import { Col, Row, Typography } from "antd";

import "./register.less";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <Row align={"middle"} justify={"center"} className={"register"}>
      <Col xs={24}>
        <Row justify={"center"}>
          <Col>
            <Typography.Title>Створити Обліковий Запис</Typography.Title>
          </Col>
        </Row>
        <Row justify={"center"} className={"register__form-row"}>
          <Col xs={24} sm={22} md={18} lg={12} xl={10} xxl={8}>
            <RegisterForm />
          </Col>
        </Row>
        <Row justify={"center"} className={"register__help-text"}>
          <Col>
            <Typography.Text>
              Вже маєте обліковий запис? <Link to={"/login"}>Увійти</Link>
            </Typography.Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Register;
