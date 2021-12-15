import React, { useCallback, useEffect, useState } from "react";
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

import {
  dateRangeRequiredRule,
  getStringMinMaxRule,
  requiredRule,
  validationMessages,
} from "common/validation";
import { DATE_FORMAT, Mode } from "common/constants";
import { useEventCategory, useUser } from "hooks";
import { IUser } from "interfaces/user.interface";
import { IEvent } from "interfaces/event.interface";
import { IEventCategory } from "interfaces/event-category.interface";
import { mapEventToFormValues } from "mappers/event.mapper";
import FileUploader from "./file-uploader";

import "./register-form.less";

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
  event?: IEvent;
  isEventLoading?: boolean;
  onSubmit(values: FormValues): Promise<void>;
  onCancel(): void;
  mode: Mode;
};

const MAX_DESCRIPTION_LENGTH = 400;

const initialValues = {
  title: "",
  description: "",
  dateRange: [],
  location: "",
  images: [],
};

const EventForm: React.FC<EventFormProps> = ({
  onCancel,
  mode,
  onSubmit,
  event,
  isEventLoading,
}) => {
  const { users, getAllUsers } = useUser();
  const { eventCategories, getAllEventCategories } = useEventCategory();
  const [form] = Form.useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFieldsDataLoading, setIsFieldsDataLoading] = useState<boolean>(false);

  const handleSubmit: FormProps["onFinish"] = useCallback(
    (values: FormValues) => {
      setIsSubmitting(true);

      onSubmit(values)
        // NOTE: catch of the error that could be thrown from mapper
        .catch(() => {
          notification.error({
            message: "Помилка при створенні події",
            description: "Будь ласка перевірте правильність введених даних",
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [onSubmit]
  );

  useEffect(() => {
    setIsFieldsDataLoading(true);

    Promise.all([getAllUsers(), getAllEventCategories()])
      .catch(() => {
        notification.error({
          message: "Сталася помилка під час завантаження даних. Спробуйте ще раз",
        });
      })
      .finally(() => {
        setIsFieldsDataLoading(false);
      });
  }, [getAllEventCategories, getAllUsers]);

  useEffect(() => {
    if (mode === Mode.EDIT && event) {
      const formValues = mapEventToFormValues(event);
      form.setFieldsValue(formValues);
    }
  }, [event, form, mode]);

  if (isFieldsDataLoading || isEventLoading) {
    return <Skeleton active paragraph={{ rows: 20 }} />;
  }

  return (
    <Form
      initialValues={initialValues}
      layout="vertical"
      onFinish={handleSubmit}
      className={"create-event-form"}
      form={form}
      validateMessages={validationMessages}
      validateTrigger={["onBlur"]}
      requiredMark
    >
      <Row gutter={32}>
        <Col xs={24} md={{ span: 12, order: 1 }}>
          <Form.Item
            label="Назва"
            name="title"
            rules={[requiredRule, getStringMinMaxRule(3, 50)]}
            required
          >
            <Input placeholder="Назва вашої події" />
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
        <Col span={24} order={3}>
          <Form.Item
            label="Опис"
            name="description"
            rules={[requiredRule, getStringMinMaxRule(3, MAX_DESCRIPTION_LENGTH)]}
            required
          >
            <Input.TextArea
              rows={5}
              minLength={3}
              maxLength={MAX_DESCRIPTION_LENGTH}
              placeholder="Опис вашої події"
              showCount
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={{ span: 12, order: 4 }}>
          <Form.Item label="Локація" name="location" rules={[getStringMinMaxRule(5, 100)]}>
            <Input placeholder="Локація вашої події" />
          </Form.Item>
        </Col>
        <Col xs={24} md={{ span: 12, order: 5 }}>
          <Form.Item label="Організатор" name="organizer" rules={[requiredRule]} required>
            <Select placeholder="Організатор події">
              {users.map(({ id, name, surname }) => (
                <Select.Option key={id} value={id}>{`${name} ${surname}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} order={6}>
          <Form.Item
            label="Зображення"
            name="images"
            valuePropName={"fileList"}
            validateTrigger={["onChange"]}
            rules={[
              {
                type: "array",
                min: 1,
                max: 5,
                message: "Подія має містити від 1 до 5 зображень",
              },
            ]}
          >
            <FileUploader listType={"picture-card"} maxCount={5} />
          </Form.Item>
        </Col>
        <Col span={24} order={7}>
          <Form.Item label="Термін події" name="dateRange" rules={[dateRangeRequiredRule]} required>
            <DatePicker.RangePicker
              showTime
              placeholder={["Початок", "Кінець"]}
              format={DATE_FORMAT}
            />
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

export default React.memo(EventForm);
