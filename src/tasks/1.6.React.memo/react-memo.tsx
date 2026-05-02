import { memo, useCallback, useState } from "react";
import { useRender } from "../../lib/render/use-render";
import { UiRender } from "../../lib/render";

export function Parent() {
  const { countRender } = useRender();
  const [count, setCount] = useState<number>(0);

  const incr = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  // const incrWithoutUseCallback = () => {
  //   setCount((prev) => prev + 1);
  // };

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "250px",
        }}
      >
        <p style={{ margin: 0 }}>#Parent</p>
        <UiRender countRender={countRender} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        <ChildWithoutMemo debugText="(child-without-memo)" onIncrement={incr} />
        <ChildWithMemo debugText="(child-with-memo)" onIncrement={incr} />
      </div>

      <p>debug-count: {count}</p>
      <button onClick={incr}>+1</button>
      <AnswerQuestion />
    </div>
  );
}

function Child({
  debugText,
  onIncrement,
}: {
  debugText: string;
  onIncrement: () => void;
}) {
  const { countRender } = useRender();

  console.log(`render-${debugText}`);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "250px",
        justifyContent: "space-between",
      }}
    >
      <p
        style={{
          margin: 0,
        }}
      >
        ├── #{debugText}
      </p>
      <button onClick={onIncrement}>+1</button>
      <UiRender countRender={countRender} />
    </div>
  );
}

export const ChildWithMemo = memo(Child);

export const ChildWithoutMemo = Child;

const AnswerQuestion = () => (
  <p>
    Без use-callback memo-компонент будет ре-рендерится даже при React.memo,
    <br />
    потому что ре-рендер компонента производит пересоздание всех функций
    <br />
    принадлежащих этому компоненту, следовательно, пересоздание ф-ии ведёт к
    <br />
    смене ссылки на саму функцию, а значит oldFunc !== currentFunc, а для
    <br />
    React.memo - это важно. К счастливой удаче в react существует
    <br />
    useCallback(fn, [deps]), который позволяет сохранять ссылку на функцию, даже
    в случае ре-рендеров.
  </p>
);
