import { useState, type ChangeEventHandler } from "react";
import { UiInput, type UiInputProps } from "../ui/ui-input";

export function AcceptTermsField(props: UiInputProps) {
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAcceptTerms(e.target.checked);
  };

  return (
    <label>
      <UiInput
        name="acceptTerms"
        type="checkbox"
        checked={acceptTerms}
        onChange={handleChange}
        {...props}
      />
      <span>Принимаю условия</span>
    </label>
  );
}
