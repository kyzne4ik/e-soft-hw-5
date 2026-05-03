import type { ReactNode } from "react";
import { type FormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useFormContext,
  FormProvider,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { UiInput } from "./ui-input";
import { UiRender, useRender } from "../../lib/render";

const fakeApi = async (data: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (data.email.includes("taken@")) throw new Error("email содержит taken@");
  return "some-response";
};

export function GoodFormRHK() {
  const { countRender } = useRender();
  return (
    <Form>
      <Form.Fields />
      <Form.SubmitButton />
      <UiRender countRender={countRender} />
    </Form>
  );
}

function Form({ children }: { children: ReactNode }) {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData, event) => {
    event?.preventDefault();

    try {
      const res = await fakeApi(data);
      console.log(res);
      form.reset();
    } catch (err) {
      // Серверная ошибка — в поле, не в alert
      form.setError("email", { message: "Этот email уже занят" });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{ position: "relative", maxWidth: "300px" }}
      >
        {children}
      </form>
    </FormProvider>
  );
}

Form.Fields = function () {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <>
      <UiInput
        id="firstName"
        type="text"
        placeholder="Ваше имя"
        {...register("firstName")}
        error={errors.firstName?.message}
      />
      <UiInput
        id="lastName"
        type="text"
        placeholder="Ваша фамилия"
        {...register("lastName")}
        error={errors.lastName?.message}
      />
      <UiInput
        id="email"
        type="email"
        placeholder="Ваш email"
        {...register("email")}
        error={errors.email?.message}
      />
      <UiInput
        id="password"
        type="password"
        placeholder="Пароль"
        {...register("password")}
        error={errors.password?.message}
      />
      <UiInput
        id="confirmPassword"
        type="password"
        placeholder="Подтвердите пароль"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <div></div>
      <div
        style={{
          paddingBottom: 20,
          position: "relative",
        }}
      >
        <select
          id="role"
          {...register("role")}
          aria-invalid={!!errors.role}
          aria-describedby="role-error"
        >
          <option value="" selected hidden disabled>
            Выбирите роль...
          </option>
          <option value="студент">студент</option>
          <option value="преподаватель">преподаватель</option>
        </select>
        {errors.role && (
          <p
            id={`role-error`}
            role="alert"
            style={{
              color: "red",
              position: "absolute",
              fontSize: 10,
              bottom: -5,
              left: 0,
            }}
          >
            {errors.role.message}
          </p>
        )}
      </div>
      <UiInput
        id="agree"
        type="checkbox"
        {...register("agree")}
        error={errors.agree?.message}
      />
    </>
  );
};

Form.SubmitButton = function () {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <button disabled={isSubmitting} type="submit">
      {isSubmitting ? "Отправляем..." : "Зарегистрироваться"}
    </button>
  );
};
