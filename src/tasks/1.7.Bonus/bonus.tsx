import { UiTodoItem, UiTodoList } from "./ui/ui-todo-list";
import { TodoAddForm } from "./forms/todo-add";
import { TodoSelect } from "./ui/todo-select";
import { TodoProvider } from "./context/todo-provider";
import { useTodo } from "./context/todo-context";
import { useState, useMemo } from "react";

export function TodoListBonus() {
  return (
    <TodoProvider>
      <BaseTodoListBonus />
    </TodoProvider>
  );
}

function BaseTodoListBonus() {
  const { tasks, addTask, deleteTask, completeTask } = useTodo();

  return (
    <div>
      <p>Мой список дел:</p>
      <UiTodoList
        items={tasks}
        renderItem={(task) => (
          <UiTodoItem
            key={task.id}
            onComplete={() => completeTask(task.id)}
            onDelete={() => deleteTask(task.id)}
            {...task}
          />
        )}
      />
      <p>Добавить задачу:</p>
      <TodoAddForm
        onSubmit={(_, task) => {
          addTask(task.title);
        }}
      />
      <TodoListSearch />
    </div>
  );
}

type Filter = "complete-true" | "complete-false";

function TodoListSearch() {
  const [count, setCount] = useState<number>(0);
  const { tasks } = useTodo();
  const [currentFilter, setCurrentFilter] = useState<Filter | null>(null);

  const filteredTasks = useMemo(() => {
    console.log("фильтрация-с-memo");
    if (!currentFilter) return tasks;

    return tasks.filter(
      (task) => task.complete === (currentFilter === "complete-true"),
    );
  }, [tasks, currentFilter]);

  const filteredTasksWithoutMemo = () => {
    console.log("фильтрация-без-memo");
    if (!currentFilter) return tasks;

    return tasks.filter(
      (task) => task.complete === (currentFilter === "complete-true"),
    );
  };

  return (
    <>
      <p>Фильтр: </p>
      <TodoSelect
        filters={["complete-false", "complete-true"] as Filter[]}
        onSearch={(req) => {
          console.log(req);
          setCurrentFilter(req);
        }}
      />
      <p>Результат-фильтрации: </p>
      <UiTodoList
        items={filteredTasks}
        renderItem={(task) => (
          <UiTodoItem
            key={task.id}
            title={task.title}
            complete={task.complete}
          />
        )}
      />
      <div>
        <p>debug-count: {count}</p>
        <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      </div>
    </>
  );
}
