import { createStrictContext, useStrictContext } from "../../../lib/react";
import type { TaskType } from "../../1.5.UseReducer/model/types";

export type TodoContext = {
  tasks: TaskType[];
  deleteTask: (taskId: string) => void;
  completeTask: (taskId: string) => void;
  addTask: (taskTitle: string) => void;
};

export const todoContext = createStrictContext<TodoContext>();

export function useTodo() {
  return useStrictContext(todoContext) as TodoContext;
}
