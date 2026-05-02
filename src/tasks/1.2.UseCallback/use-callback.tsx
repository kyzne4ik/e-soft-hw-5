import { useCallback, useState, memo } from "react";

export function Counter() {
  const [countA, setCountA] = useState<number>(0);
  const [countB, setCountB] = useState<number>(0);
  const [countC, setCountC] = useState<number>(0);

  const incrementB = () => {
    setCountB((prev) => prev + 1);
  };

  const incrementC = useCallback(() => {
    setCountC((prev) => prev + 1);
  }, []);

  return (
    <>
      <div>
        <p>countA: {countA}</p>
        <p>countB: {countB}</p>
        <p>countC: {countC}</p>
      </div>
      <div
        style={{
          marginLeft: 10,
        }}
      >
        <p>обычный кнопка</p>
        <button onClick={() => setCountA((prev) => prev + 1)}>+1</button>
      </div>
      <ListWithoutMemo
        label="без memo"
        textButton="+1"
        onIncrement={incrementB}
      />
      <ListWithMemo
        label="c memo (без use-callback)"
        textButton="+1"
        onIncrement={incrementB}
      />
      <ListWithMemo
        label="с memo и use-callback"
        textButton="+1"
        onIncrement={incrementC}
      />
    </>
  );
}

function List({
  label,
  textButton,
  onIncrement,
}: {
  label: string;
  textButton: string;
  onIncrement: () => void;
}) {
  console.log("render-" + label);

  const items = ["el-1", "el-2", "el-3"];

  return (
    <div
      style={{
        marginLeft: 10,
      }}
    >
      <p>{label}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} <button onClick={onIncrement}>{textButton}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ListWithoutMemo = List;
const ListWithMemo = memo(List);
