import { UiInput, type UiInputProps } from "../ui/ui-input";

export function LastNameField(props: UiInputProps) {
  return (
    <UiInput name="lastName" type="text" placeholder="Фамилия" {...props} />
  );
}
