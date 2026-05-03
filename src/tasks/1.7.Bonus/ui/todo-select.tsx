import type { ChangeEventHandler } from "react";

export function TodoSelect<T extends string>({
  filters,
  onSearch,
}: {
  filters: T[];
  onSearch?: (req: T) => void;
}) {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const variant = event.target.value as T;

    onSearch?.(variant);
  };

  return (
    <select onChange={handleChange} defaultValue={""}>
      <option value="" disabled selected hidden>
        Выберите вариант...
      </option>
      {filters.map((v, index) => (
        <option key={index} value={v}>
          {v}
        </option>
      ))}
    </select>
  );
}
