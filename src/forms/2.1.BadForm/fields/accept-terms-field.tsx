import { UiInput, type UiInputProps } from "../ui/ui-input";

export function AcceptTermsField(props: UiInputProps) {
  return (
    <label>
      <UiInput name="acceptTerms" type="checkbox" {...props} />
      <span>Принимаю условия</span>
    </label>
  );
}
