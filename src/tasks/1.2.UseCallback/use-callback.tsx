import { useCallback, useState, memo } from "react";

export function Counter() {
  const [count, setCount] = useState<number>(0);

  const incrementA = () => {
    setCount((prev) => (prev += 1));
    console.log("клик без use-callback");
  };

  const incrementB = useCallback(() => {
    setCount((prev) => (prev += 1));
    console.log("Клик с use-callback");
  }, []);

  return (
    <>
      <div>
        <ButtonWithoutMemo textButton={`${count}`} onIncrement={incrementA} />
      </div>
      <div>
        <ButtonWithMemo textButton={`${count}`} onIncrement={incrementA} />
      </div>
      <div>
        <ButtonWithMemo textButton={`${count}`} onIncrement={incrementB} />
      </div>
    </>
  );
}

function ButtonWithoutMemo({
  onIncrement,
  textButton,
}: {
  onIncrement: () => void;
  textButton: string;
}) {
  return <button onClick={onIncrement}>{textButton}</button>;
}

const ButtonWithMemo = memo(function ({
  onIncrement,
  textButton,
}: {
  onIncrement: () => void;
  textButton: string;
}) {
  return <button onClick={onIncrement}>{textButton}</button>;
});
