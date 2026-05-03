import { UiInput, type UiInputProps } from "../ui/ui-input";

export function ConfirmPasswordField(props: UiInputProps) {

  return (
    <UiInput
      name="confirmPassword"
      type="password"
      placeholder="Подтвердите пароль"
      {...props}
    />
  );
}
