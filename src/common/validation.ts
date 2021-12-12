export const validationMessages = {
  required: "Обов'язкове поле",
  types: { email: "Невірний Формат" },
  string: {
    min: "Не менше ${min} символів",
    max: "Не більше ${max} символів",
    range: "К-сть символів має бути між ${min} та ${max}",
  },
};

export const requiredRule = { required: true };

export const emailRule = { type: "email" as const };

export const ukrainianCharactersRule = {
  pattern: /^[А-Яа-яЄєІіЇїҐґ]+[А-Яа-яЄєІіЇїҐґ\- ]*[А-Яа-яЄєІіЇїҐґ]+$/,
  message: "Лише українські літери",
};

export const phoneNumberRule = {
  pattern: /^0[0-9]{2}(-| )?[0-9]{3}\1[0-9]{4}$/,
  message: "Невірний формат (0xxxxxxxxx, 0xx-xxx-xxxx, 0xx xxx xxxx)",
};

export const getMinMaxRule = (min: number, max: number): { min: number; max: number } => {
  if (min >= max) {
    return { min: max, max: min };
  }

  return { min, max };
};
