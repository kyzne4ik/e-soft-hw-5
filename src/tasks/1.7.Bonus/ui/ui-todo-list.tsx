import type { ReactNode, ChangeEventHandler } from "react";
import { UiRender, useRender } from "../../../lib/render";

export function UiTodoList<T>({
  items,
  renderItem,
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}) {
  if (items.length <= 0) return <p>пусто</p>;

  console.log(items);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginLeft: 10,
      }}
    >
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}

export function UiTodoItem({
  title,
  complete,
  onComplete,
  onDelete,
}: {
  title: string;
  complete: boolean;
  onComplete?: (complete: boolean) => void;
  onDelete?: () => void;
}) {
  const { countRender } = useRender();

  const handleComplete: ChangeEventHandler<HTMLInputElement> = (e) => {
    onComplete?.(e.target.checked);
  };

  return (
    <div
      style={{
        position: 'relative',
        border: "2px solid var(--text-color)",
        borderRadius: 10,
        padding: 4,
        boxSizing: "border-box",
        maxWidth: '400px'
      }}
    >
      <p>{title}</p>
      <input
        type="checkbox"
        checked={complete}
        disabled={!onComplete}
        onChange={handleComplete}
      />
      {onDelete && <button onClick={onDelete}>delete</button>}
      <UiRender countRender={countRender} />
    </div>
  );
}
