import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  notification,
  Row,
  Select,
  Skeleton,
  UploadProps,
} from "antd";
import { Moment } from "moment";

import { getMinMaxRule, requiredRule, validationMessages } from "common/validation";
import { Mode } from "common/constants";
import { useEvent, useEventCategory, useUser } from "hooks";
import { IUser } from "interfaces/user.interface";
import { IEventCategory } from "interfaces/event-category.interface";
import { mapEventToFormValues, mapFormValuesToEvent } from "mappers/event.mapper";
import FileUploader from "./file-uploader";

import "./register-form.less";
import { IEvent } from "../interfaces/event.interface";

export type FormValues = {
  title: string;
  description: string;
  dateRange: [Moment, Moment];
  location: string;
  category: IEventCategory["id"];
  organizer: IUser["id"];
  images: UploadProps["fileList"];
};

type EventFormProps = {
  onCancel(): void;
  mode: Mode;
};

const initialValues = {
  title: "",
  description: "",
  dateRange: [],
  location: "",
  images: [],
};

const EventForm: React.FC<EventFormProps> = ({ onCancel, mode }) => {
  const navigate = useNavigate();
  const { users, getAllUsers } = useUser();
  const { createEvent, updateEvent, getEventById } = useEvent();
  const { eventCategories, getAllEventCategories } = useEventCategory();
  const [form] = Form.useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<IEvent>();
  const { id } = useParams();

  const handleSubmit: FormProps["onFinish"] = (values: FormValues) => {
    setIsSubmitting(true);

    const eventData = mapFormValuesToEvent(values);

    if (mode === Mode.CREATE) {
      createEvent(eventData)
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          notification.error({
            message: "Помилка при створенні події",
            description: error.message,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else if (mode === Mode.EDIT) {
      const eventId = Number(id);
      updateEvent(eventId, eventData)
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          notification.error({
            message: "Помилка при редагуванні події",
            description: error.message,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getAllUsers();
    getAllEventCategories();

    if (mode === Mode.EDIT) {
      const eventId = Number(id);
      getEventById(eventId)
        .then((event) => {
          setEvent(event);
          return mapEventToFormValues(event);
        })
        .then((formValues) => {
          form.setFieldsValue(formValues);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [form, getAllEventCategories, getAllUsers, getEventById, id, mode]);

  if (mode === Mode.EDIT && isLoading) {
    return <Skeleton active paragraph={{ rows: 20 }} />;
  }

  const handleImageRemove: UploadProps["onRemove"] = (...params) => {
    if (mode !== Mode.EDIT) return;

    if (event) {
      console.log(params, event.images);
    }
  };

  return (
    <Form
      initialValues={initialValues}
      layout="vertical"
      onFinish={handleSubmit}
      className={"create-event-form"}
      form={form}
      validateMessages={validationMessages}
      requiredMark
    >
      <Row gutter={32}>
        <Col xs={24} md={{ span: 12, order: 1 }}>
          <Form.Item
            label="Назва"
            name="title"
            rules={[requiredRule, getMinMaxRule(3, 50)]}
            required
          >
            <Input placeholder="Назва вашої події" />
          </Form.Item>
        </Col>
        <Col xs={24} md={{ span: 12, order: 3 }}>
          <Form.Item
            label="Опис"
            name="description"
            rules={[requiredRule, getMinMaxRule(3, 200)]}
            required
          >
            <Input.TextArea
              rows={5}
              minLength={3}
              maxLength={300}
              placeholder="Опис вашої події"
              showCount
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={{ span: 12, order: 2 }}>
          <Form.Item label="Категорія" name="category" rules={[requiredRule]} required>
            <Select placeholder={"Категорія вашої події"}>
              {eventCategories.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={{ span: 12, order: 4 }}>
          <Form.Item label="Локація" name="location" rules={[getMinMaxRule(5, 100)]}>
            <Input placeholder="Локація вашої події" />
          </Form.Item>
          <Form.Item label="Організатор" name="organizer" rules={[requiredRule]} required>
            <Select placeholder="Організатор події">
              {users.map(({ id, name, surname }) => (
                <Select.Option key={id} value={id}>{`${name} ${surname}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} order={5}>
          <Form.Item label="Зображення" name="images" valuePropName={"fileList"}>
            <FileUploader listType={"picture-card"} maxCount={5} onRemove={handleImageRemove} />
          </Form.Item>
        </Col>
        <Col span={24} order={6}>
          <Form.Item label="Термін події" name="dateRange" rules={[]} required>
            <DatePicker.RangePicker showTime placeholder={["Початок", "Кінець"]} />
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"} gutter={[48, 16]} className={"register-form__buttons"}>
        <Col xs={24} md={12}>
          <Button type={"primary"} htmlType={"submit"} loading={isSubmitting} block>
            {mode === Mode.CREATE ? "Створити" : "Зберегти"}
          </Button>
        </Col>
        <Col xs={24} md={12}>
          <Button htmlType={"button"} onClick={onCancel} block>
            Скасувати
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EventForm;
