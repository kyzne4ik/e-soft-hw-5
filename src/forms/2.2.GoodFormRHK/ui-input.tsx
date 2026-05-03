import { forwardRef, type InputHTMLAttributes } from "react";

export type UiInputProps = {
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const UiInput = forwardRef<HTMLInputElement, UiInputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div style={{ paddingBottom: 20, position: "relative" }}>
        <input
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={`${props.id}-error`}
          {...props}
        />
        {error && (
          <p
            id={`${props.id}-error`}
            role="alert"
            style={{
              color: "red",
              position: "absolute",
              fontSize: 10,
              bottom: -5,
              left: 0,
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
