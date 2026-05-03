import { useState, type ChangeEventHandler } from "react";
import { UiInput, type UiInputProps } from "../ui/ui-input";

export function EmailField(props: UiInputProps) {
  const [email, setEmail] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  return (
    <UiInput
      name="email"
      type="email"
      placeholder="Ваша почта"
      value={email}
      onChange={handleChange}
      {...props}
    />
  );
}
