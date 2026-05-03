import { TASKS } from "./model/consts";
import type { TaskType } from "./model/types";
import { useReducer, type Reducer } from "react";
import { UiTodoItem, UiTodoList } from "./ui/ui-todo-list";
import { TodoAddForm } from "./ui/todo-add-form";

type Actions =
  | { type: "ADD_TODO"; payload: TaskType }
  | { type: "TOGGLE_TODO"; todoId: string }
  | { type: "DELETE_TODO"; todoId: string };

const reducer: Reducer<TaskType[], Actions> = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TODO": {
      return state.map((todo) => {
        if (todo.id === action.todoId) {
          return { ...todo, complete: !todo.complete };
        } else {
          return { ...todo };
        }
      });
    }
    case "ADD_TODO": {
      return [...state, action.payload];
    }
    case "DELETE_TODO": {
      return state.filter((item) => item.id !== action.todoId);
    }
    default:
      return state;
  }
};

export function TodoList() {
  const [state, dispatch] = useReducer(reducer, TASKS);

  return (
    <div>
      <p>Мой список дел:</p>
      <UiTodoList
        items={state}
        renderItem={(item) => (
          <UiTodoItem
            key={item.id}
            onComplete={() =>
              dispatch({
                type: "TOGGLE_TODO",
                todoId: item.id,
              })
            }
            onDelete={() =>
              dispatch({
                type: "DELETE_TODO",
                todoId: item.id,
              })
            }
            {...item}
          />
        )}
      />
      <p>Добавить задачу:</p>
      <TodoAddForm
        onSubmit={(_, data) => {
          dispatch({
            type: "ADD_TODO",
            payload: {
              id: crypto.randomUUID(),
              title: data.title,
              complete: false,
            },
          });
        }}
      />
    </div>
  );
}
