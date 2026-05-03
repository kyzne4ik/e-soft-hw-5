import type { InputHTMLAttributes } from "react";

export type UiInputProps = {
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function UiInput({ error, ...props }: UiInputProps) {
  return (
    <div style={{
      paddingBottom: 20,
      position: 'relative'
    }}>
      <input {...props} />
      <p style={{ color: "red", position: "absolute", fontSize: 10, bottom: -5, left: 0 }}>
        {error}
      </p>
    </div>
  );
}
