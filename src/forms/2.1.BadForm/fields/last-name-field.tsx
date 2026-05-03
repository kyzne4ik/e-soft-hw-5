import { useState, type ChangeEventHandler } from "react";
import { UiInput, type UiInputProps } from "../ui/ui-input";

export function LastNameField(props: UiInputProps) {
  const [lastName, setLastName] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLastName(e.target.value);
  };

  return (
    <UiInput
      name="lastName"
      type="text"
      placeholder="Фамилия"
      value={lastName}
      onChange={handleChange}
      {...props}
    />
  );
}
