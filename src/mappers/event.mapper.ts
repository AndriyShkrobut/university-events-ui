import moment, { Moment } from "moment";

import { IEvent } from "interfaces/event.interface";
import { FormValues } from "components/event-form";

export const mapEventToFormValues = (event: IEvent): FormValues => {
  const { title, description, startDate, endDate, location } = event;

  const dateRange = [moment(startDate), moment(endDate)] as [Moment, Moment];
  const category = Number(event.category.id);
  const organizer = Number(event.organizer.id);

  const images = event.images.map((item) => {
    const { id, image } = item;

    const uid = String(id);
    const name = image.name;
    const preview = image.url;
    const thumbUrl = image.url;
    // NOTE: Antd uploader sets modal preview header text from url field but render image from preview field
    const url = `${image.name}${image.extension}`;
    const status = "done" as const;

    return { uid, name, url, status, preview, thumbUrl };
  });

  return { title, description, dateRange, location, category, organizer, images };
};

export const mapFormValuesToEvent = (formValues: FormValues): FormData => {
  const { title, description, dateRange, location, category, organizer, images } = formValues;
  const [start, end] = dateRange;

  const organizerId = String(organizer);
  const categoryId = String(category);

  const startDate = start.utc().format();
  const endDate = end.utc().format();

  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  formData.append("location", location);
  formData.append("categoryId", categoryId);
  formData.append("organizerId", organizerId);

  if (images && images.length) {
    images.forEach((item) => {
      const file = item.originFileObj;

      if (file) {
        formData.append("images", file);
      }
    });
  }

  return formData;
};
