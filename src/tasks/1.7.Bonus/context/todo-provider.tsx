import { useCallback, useReducer, type ReactNode, type Reducer } from "react";
import { todoContext } from "./todo-context";
import type { TaskType } from "../model/types";
import { TASKS } from "../model/consts";

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
          return todo;
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

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, TASKS);

  const completeTask = useCallback((itemId: string) => {
    dispatch({
      type: "TOGGLE_TODO",
      todoId: itemId,
    });
  }, []);

  const deleteTask = useCallback((itemId: string) => {
    dispatch({
      type: "DELETE_TODO",
      todoId: itemId,
    });
  }, []);

  const addTask = useCallback((taskTitle: string) => {
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: crypto.randomUUID(),
        title: taskTitle,
        complete: false,
      },
    });
  }, []);

  return (
    <todoContext.Provider
      value={{
        tasks: state,
        completeTask,
        deleteTask,
        addTask,
      }}
    >
      {children}
    </todoContext.Provider>
  );
}
