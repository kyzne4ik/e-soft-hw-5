import { useEffect, useRef, useState } from "react";

export function ControlledMiniForma() {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef<string>("");

  const onClick = () => {
    const el = inputRef.current;
    if (!el) return;

    el.focus();
  };

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  console.log("render-mini-controlled-forma");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "30%",
      }}
    >
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="some-placeholder"
      />
      <p>current-value: {value}</p>
      <p>prev-value: {prevValueRef.current}</p>
      <button onClick={onClick}>сделать фокус на input-поле</button>
    </div>
  );
}
