import { UiInput, type UiInputProps } from "../ui/ui-input";

export function FirstNameField(props: UiInputProps) {

  return (
    <UiInput
      name="firstName"
      type="text"
      placeholder="Имя"
      {...props}
    />
  );
}
