import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, notification, Row } from "antd";

import { emailRule, requiredRule, validationMessages } from "common/validation";
import { useAuth } from "hooks";

import "./login-form.less";

type FormValues = {
  login: string;
  password: string;
};

const initialValues: FormValues = {
  login: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    login(values)
      .then(() => {
        notification.success({ message: "Ви успішно увійшли!" });
        navigate("/");
      })
      .catch((error) => {
        notification.error({ message: "Помилка при входженні", description: error.message });
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Form
      initialValues={initialValues}
      layout="vertical"
      onFinish={handleSubmit}
      className={"login-form"}
      form={form}
      validateMessages={validationMessages}
      validateTrigger={["onBlur"]}
      requiredMark={false}
    >
      <Form.Item label={"Логін"} name={"login"} rules={[requiredRule, emailRule]} required>
        <Input placeholder={"Ваш email"} />
      </Form.Item>
      <Form.Item label={"Пароль"} name={"password"} rules={[requiredRule]} required>
        <Input.Password placeholder={"Ваш пароль"} />
      </Form.Item>
      <Row justify={"center"} gutter={[48, 16]} className={"login-form__buttons"}>
        <Col xs={24}>
          <Button type={"primary"} htmlType={"submit"} loading={isLoading} block>
            Увійти
          </Button>
        </Col>
        <Col xs={24}>
          <Button htmlType={"button"} onClick={handleCancel} block>
            На головну
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
