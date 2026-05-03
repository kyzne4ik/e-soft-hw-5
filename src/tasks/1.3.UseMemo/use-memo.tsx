import { useMemo, useState } from "react";

const ARRAY_RANDOM_LENGTH = 1000000;

const generate = (len: number): number[] =>
  Array.from({ length: len }, () => {
    return Math.floor(Math.random() * 10) + 1; // range(1, 10)
  });

const computeSum = (nums: number[]) => {
  console.log("сложный подсчёт суммы");
  return nums.reduce((a, b) => a + b, 0);
};

export function HardCalculate() {
  const [nums, setNums] = useState<number[]>(() =>
    generate(ARRAY_RANDOM_LENGTH),
  );
  const [count, setCount] = useState<number>(0);

  const sum = useMemo(() => computeSum(nums), [nums]);

  // const sumWithoutMemo = computeSum(nums);

  return (
    <div>
      <p>сумма: {sum}</p>
      {/*<p>сумма: {sumWithoutMemo}</p>*/}
      <p>счётчик: {count}</p>
      <button onClick={() => setNums(generate(ARRAY_RANDOM_LENGTH))}>
        сгенерировать новый-массив
      </button>
      <button onClick={() => setCount((prev) => prev + 1)}>
        +1 к счётчику
      </button>
    </div>
  );
}
