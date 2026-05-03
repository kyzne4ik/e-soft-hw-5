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
  type Role,
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
  /**
   * антипаттерн: валидация email через .includes('@') - плохо,
   * потому что пройдёт даже случай с someEmail@ или с @someEmail
   */
  if (data.email && !data.email.includes("@")) {
    errors.email = "Вы ввели некорректный email";
  }
  return errors;
};

export function BadForm() {
  /**
   * антипаттерн: использование use-state для каждого поля отдельно, так ещё и в одном компонент - плохо,
   * потому что это вызывает лишние ре-рендеры всей формы при вводе каждого символа
   */
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<Role | null>("студент");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const { countRender } = useRender();
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const handleSubmit: ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as unknown as BadFormData;

    /**
     * антипаттерн: проверка полей только после отправки формы,
     * хотя лучше проверять при вводе(onChange) на лету или при фокусе(onBlur).
     */
    const errs = validateForm(data);
    if (Object.keys(errs).length === 0) {
      console.log("submit");
      setErrors(null);
      /**
       * антипаттерн: использование alert ведёт к блокировке интерфейса браузера
       */
      alert("Серверная-ошибка (500)");
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
      <FirstNameField
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        error={errors?.firstName}
      />

      <LastNameField
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        error={errors?.lastName}
      />

      <EmailField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors?.email}
      />

      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors?.password}
      />

      <ConfirmPasswordField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors?.confirmPassword}
      />

      <RoleField
        value={role || ""}
        onChange={(e) => setRole(e.target.value as Role)}
      />

      <AcceptTermsField
        checked={acceptTerms}
        onChange={(e) => setAcceptTerms(e.target.checked)}
        error={errors?.acceptTerms}
      />
      {/**
       * антипаттерн: кнопка submit не блокируется.
       * (пользователь может кликнуть много раз и отправить дубли запросов)
       */}
      <button type="submit">отправить форму</button>
      <UiRender countRender={countRender} />
    </form>
  );
}
