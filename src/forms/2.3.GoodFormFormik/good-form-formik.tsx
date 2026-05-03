import { schema } from "./schema";
import { UiInput } from "./ui-input";
import { UiRender, useRender } from "../../lib/render";
import { useFormik } from "formik";
import * as yup from "yup";

type FormData = yup.InferType<typeof schema>;

const fakeApi = async (data: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (data.email.includes("taken@")) throw new Error("email содержит taken@");
  return "some-response";
};

export function GoodFormFormik() {
  const { countRender } = useRender();

  return (
    <div style={{ position: "relative", maxWidth: "300px" }}>
      <Form />
      <UiRender countRender={countRender} />
    </div>
  );
}

function Form() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      agree: false,
    },
    validationSchema: schema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        await fakeApi(values);
        console.log("Успех!", values);
        resetForm();
      } catch {
        setFieldError("email", "Этот email уже занят");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <UiInput
        id="firstName"
        type="text"
        placeholder="Ваше имя"
        {...formik.getFieldProps("firstName")}
        error={formik.touched.firstName ? formik.errors.firstName : undefined}
      />

      <UiInput
        id="lastName"
        type="text"
        placeholder="Ваша фамилия"
        {...formik.getFieldProps("lastName")}
        error={formik.touched.lastName ? formik.errors.lastName : undefined}
      />

      <UiInput
        id="email"
        type="email"
        placeholder="Ваш email"
        {...formik.getFieldProps("email")}
        error={formik.touched.email ? formik.errors.email : undefined}
      />

      <UiInput
        id="password"
        type="password"
        placeholder="Пароль"
        {...formik.getFieldProps("password")}
        error={formik.touched.password ? formik.errors.password : undefined}
      />

      <UiInput
        id="confirmPassword"
        type="password"
        placeholder="Подтвердите пароль"
        {...formik.getFieldProps("confirmPassword")}
        error={
          formik.touched.confirmPassword
            ? formik.errors.confirmPassword
            : undefined
        }
      />

      <div style={{ paddingBottom: 20, position: "relative" }}>
        <select
          id="role"
          {...formik.getFieldProps("role")}
          aria-invalid={!!formik.errors.role}
          aria-describedby="role-error"
        >
          <option value="" disabled hidden>
            Выберите роль...
          </option>
          <option value="студент">студент</option>
          <option value="преподаватель">преподаватель</option>
        </select>

        {formik.touched.role && formik.errors.role && (
          <p
            id="role-error"
            role="alert"
            style={{
              color: "red",
              position: "absolute",
              fontSize: 10,
              bottom: -5,
              left: 0,
            }}
          >
            {formik.errors.role}
          </p>
        )}
      </div>

      <div style={{ paddingBottom: 20, position: "relative" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            {...formik.getFieldProps("agree")}
            aria-invalid={!!formik.errors.agree}
            aria-describedby="agree-error"
            checked={formik.values.agree}
          />
          Принимаю условия
        </label>
        {formik.touched.agree && formik.errors.agree && (
          <p
            id="agree-error"
            role="alert"
            style={{
              color: "red",
              position: "absolute",
              fontSize: 10,
              bottom: -5,
              left: 0,
            }}
          >
            {formik.errors.agree}
          </p>
        )}
      </div>

      <button disabled={formik.isSubmitting} type="submit">
        {formik.isSubmitting ? "Отправляем..." : "Зарегистрироваться"}
      </button>
    </form>
  );
}
/**
 * Сравните подходы — что удобнее и почему?
 * Я считаю что react-hook-form лучше, потому что в нём нужно меньше прокидывать шаблонного кода
 * + к этому всему rhk - использует ref под капотом, а formik - использует useState -
 * - это плохо так как в случае с formik, форма будет перерисовываться при каждом вводе символа.
 * Ещё rhf - лучше, так как можно с помощью контекста разбить сложную форму на изолированные микро-компоненты.
 */