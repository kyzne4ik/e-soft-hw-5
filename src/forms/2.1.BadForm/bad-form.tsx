import { useState, type ChangeEventHandler } from "react";
import { UiRender, useRender } from "../../lib/render";
import {
  AcceptTermsField,
  ConfirmPasswordField,
  EmailField,
  FirstNameField,
  LastNameField,
  PasswordField,
  RoleField,
} from "./fields";
import type { BadFormData } from "./model/types";

type FormErrors = Partial<Record<keyof BadFormData, string>>;

const validateForm = (data: Partial<BadFormData>): FormErrors => {
  const errors: FormErrors = {};

  Object.entries(data).forEach(([field, value]) => {
    const key = field as keyof BadFormData;
    if (value === undefined || value === null || value === "") {
      errors[key] = `Поле обязательно к заполнению`;
    }
  });
  if (!data.acceptTerms) {
    errors.acceptTerms = "Вы забыли принять условия";
  }
  if (data.password && data.confirmPassword !== data.password) {
    errors.confirmPassword = "Пароли не совпадают";
  }
  if (data.email && !data.email.includes("@")) {
    errors.email = "Вы ввели некорректный email";
  }
  return errors;
};

export function BadForm() {
  const { countRender } = useRender();
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const handleSubmit: ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as unknown as BadFormData;

    // console.log(data);

    const errs = validateForm(data);
    // console.log(errs)
    if (Object.keys(errs).length === 0) {
      // Отправка формы
      console.log("submit");
      setErrors(null);
    } else {
      setErrors(errs);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        position: "relative",
      }}
    >
      <FirstNameField error={errors?.firstName} />
      <LastNameField error={errors?.lastName} />
      <EmailField error={errors?.email} />
      <PasswordField error={errors?.password} />
      <ConfirmPasswordField error={errors?.confirmPassword} />
      <RoleField />
      <AcceptTermsField error={errors?.acceptTerms} />
      <button type="submit">отправить форму</button>
      <UiRender countRender={countRender} />
    </form>
  );
}
