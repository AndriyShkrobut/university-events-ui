import { FormValues } from "components/register-form";

export const mapFormValuesToUser = (formValues: FormValues): FormData => {
  const { name, surname, phoneNumber, email, password, image } = formValues;

  const formData = new FormData();

  formData.append("name", name);
  formData.append("surname", surname);
  formData.append("phoneNumber", `+38${phoneNumber}`);
  formData.append("email", email);
  formData.append("password", password);

  if (image && image.length) {
    const [file] = image;
    const fileObject = file.originFileObj;
    if (fileObject) {
      formData.append("image", fileObject);
    }
  }

  return formData;
};
