import { useState, type ChangeEventHandler } from "react";
import { UiInput, type UiInputProps } from "../ui/ui-input";

export function ConfirmPasswordField(props: UiInputProps) {
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <UiInput
      name="confirmPassword"
      type="password"
      placeholder="Подтвердите пароль"
      value={confirmPassword}
      onChange={handleChange}
      {...props}
    />
  );
}
