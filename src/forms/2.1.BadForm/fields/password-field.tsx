import { useState, type ChangeEventHandler } from "react";
import { UiInput, type UiInputProps } from "../ui/ui-input";

export function PasswordField(props: UiInputProps) {
  const [password, setPassword] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <UiInput
      name="password"
      type="password"
      placeholder="Пароль"
      value={password}
      onChange={handleChange}
      {...props}
    />
  );
}
