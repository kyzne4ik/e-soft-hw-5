import { useState, type ChangeEventHandler } from "react";
import { UiInput, type UiInputProps } from "../ui/ui-input";

export function FirstNameField(props: UiInputProps) {
  const [firstName, setFirstName] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFirstName(e.target.value);
  };

  return (
    <UiInput
      name="firstName"
      type="text"
      placeholder="Имя"
      value={firstName}
      onChange={handleChange}
      {...props}
    />
  );
}
