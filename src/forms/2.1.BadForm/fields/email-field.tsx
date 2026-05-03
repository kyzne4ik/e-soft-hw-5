import { UiInput, type UiInputProps } from "../ui/ui-input";

export function EmailField(props: UiInputProps) {
  return (
    <UiInput name="email" type="text" placeholder="Ваша почта" {...props} />
  );
}
