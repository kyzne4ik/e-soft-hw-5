import { UiInput, type UiInputProps } from "../ui/ui-input";

export function PasswordField(props: UiInputProps) {
  return (
    <UiInput name="password" type="password" placeholder="Пароль" {...props} />
  );
}
