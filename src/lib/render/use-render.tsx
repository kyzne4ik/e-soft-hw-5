import { useRef } from "react";

export function useRender() {
  const ref = useRef<number>(0);

  ref.current += 1;

  return {
    countRender: ref.current,
  };
}
