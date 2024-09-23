"use client";

import { Todo } from "@prisma/client";
import React from "react";
import { Checkbox } from "../ui/checkbox";

import { useTransition } from "react";
import { changeTodoStatusAction } from "@/action";

import { DeleteTodoPage } from "./Delete";
import { EditTodoPage } from "./EditTodo";

interface TodoListProps {
  todo: Todo;
}

const TodoList = ({ todo }: TodoListProps) => {
  const { isCompleted } = todo;

  const [isPending, startTransition] = useTransition();

  return (
    <li className="flex  items-center justify-between gap-3 p-4 border-b transition-colors hover:bg-muted/50 ">
      <div className="flex items-center gap-x-3 justify-center">
        <Checkbox
          id={todo.id}
          defaultChecked={todo.isCompleted}
          onCheckedChange={(checked: boolean) => {
            startTransition(() => {
              changeTodoStatusAction(todo.id, checked);
            });
          }}
        />

        <span>
          {isPending ? (
            "Loading..."
          ) : (
            <span className={isCompleted ? "line-through opacity-50" : ""}>
              {todo.title}
            </span>
          )}
        </span>
      </div>
      <div className="flex gap-x-3  justify-between items-center">
        <EditTodoPage todo={todo} />
        <DeleteTodoPage id={todo.id} />
      </div>
    </li>
  );
};

export default TodoList;
