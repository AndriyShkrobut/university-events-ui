import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormProps, Input, notification, Row, UploadProps } from "antd";

import {
  emailRule,
  getStringMinMaxRule,
  phoneNumberRule,
  requiredRule,
  ukrainianCharactersRule,
  validationMessages,
} from "common/validation";
import { useAuth, useUser } from "hooks";
import { mapFormValuesToUser } from "mappers/auth.mapper";
import FileUploader from "./file-uploader";

import "./register-form.less";

export type FormValues = {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  image: UploadProps["fileList"];
  password: string;
};

const initialValues: FormValues = {
  name: "",
  surname: "",
  phoneNumber: "",
  email: "",
  image: [],
  password: "",
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { createUser } = useUser();
  const { login } = useAuth();
  const [form] = Form.useForm<FormValues>();

  const handleSubmit: FormProps["onFinish"] = (values: FormValues) => {
    const userData = mapFormValuesToUser(values);

    createUser(userData)
      .then(() => {
        const loginData = { login: values.email, password: values.password };
        return login(loginData);
      })
      .catch(() => {
        notification.error({
          message: "Помилка при рєстрації",
          description: "Будь ласка перевірте правильність введених даних",
        });
      })
      .then(() => {
        navigate("/");
      });
  };

  const validatePasswordConfirmation = (confirmation: string) => {
    const password = form.getFieldValue("password");

    if (password !== confirmation) return Promise.reject("Не співпадає з паролем");

    return Promise.resolve();
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Form
      initialValues={initialValues}
      layout="vertical"
      onFinish={handleSubmit}
      className={"register-form"}
      form={form}
      validateMessages={validationMessages}
      requiredMark
    >
      <Form.Item
        label="Ім'я"
        name="name"
        rules={[requiredRule, ukrainianCharactersRule, getStringMinMaxRule(3, 20)]}
        required
      >
        <Input placeholder="Іван" />
      </Form.Item>
      <Form.Item
        label="Прізвище"
        name="surname"
        rules={[requiredRule, ukrainianCharactersRule, getStringMinMaxRule(3, 20)]}
        required
      >
        <Input placeholder="Ванич" />
      </Form.Item>
      <Form.Item label="Номер Телефону" name="phoneNumber" rules={[requiredRule, phoneNumberRule]}>
        <Input addonBefore="+38" placeholder={"0xx-xxx-xxxx"} />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[requiredRule, emailRule]} required>
        <Input placeholder="example@example.com" />
      </Form.Item>
      <Form.Item label="Фото профілю" name="image" valuePropName={"fileList"}>
        <FileUploader listType={"picture"} maxCount={1} />
      </Form.Item>
      <Form.Item label="Пароль" name="password" rules={[requiredRule]}>
        <Input.Password placeholder={"Придумайте пароль"} />
      </Form.Item>
      <Form.Item
        label="Підтвердження пароля"
        name="confirmation"
        dependencies={["password"]}
        rules={[requiredRule, { validator: (_, value) => validatePasswordConfirmation(value) }]}
      >
        <Input.Password placeholder="Підтвердіть пароль" />
      </Form.Item>
      <Row justify={"center"} gutter={[48, 16]} className={"register-form__buttons"}>
        <Col xs={24} md={12}>
          <Button type={"primary"} htmlType={"submit"} block>
            Зареєструватись
          </Button>
        </Col>
        <Col xs={24} md={12}>
          <Button htmlType={"button"} onClick={handleCancel} block>
            На головну
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterForm;
