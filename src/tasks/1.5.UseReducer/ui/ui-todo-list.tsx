import type { ReactNode, ChangeEventHandler } from "react";

export function UiTodoList<T>({
  items,
  renderItem,
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}) {
  if (items.length <= 0) return <p>пусто</p>;

  console.log(items)
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: '1rem',
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
  onComplete: (complete: boolean) => void;
  onDelete: () => void;
}) {
  const handleComplete: ChangeEventHandler<HTMLInputElement> = (e) => {
    onComplete?.(e.target.checked);
  };

  return (
    <div
      style={{
        border: "2px solid var(--text-color)",
        borderRadius: 10,
        padding: 4,
        boxSizing: "border-box",
      }}
    >
      <p>{title}</p>
      <input type="checkbox" checked={complete} onChange={handleComplete} />
      <button onClick={onDelete}>delete</button>
    </div>
  );
}
