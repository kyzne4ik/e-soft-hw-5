import type { SubmitEventHandler, SubmitEvent } from "react";

type TodoAddFormData = {
  title: string;
};

export function TodoAddForm({
  onSubmit,
}: {
  onSubmit: (
    event: SubmitEvent<HTMLFormElement>,
    data: TodoAddFormData,
  ) => void;
}) {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event?.preventDefault();
    
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as unknown as TodoAddFormData;

    onSubmit(event, data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Название задачи" />
      <button type="submit">Добавить</button>
    </form>
  );
}
