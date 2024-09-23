"use server";

import { changeTodoStatus, CreateTodo, DeleteTodo, EditTodo } from "@/lib/todo";
import { revalidatePath } from "next/cache";

export async function AddTodoAction(title: string) {
  await CreateTodo(title);

  revalidatePath("/");
}

export async function changeTodoStatusAction(id: string, isCompleted: boolean) {
  await changeTodoStatus(id, isCompleted);

  revalidatePath("/");
}

export async function EditTodoAction(newTitle: string, newId: string) {
  await EditTodo(newTitle, newId);

  revalidatePath("/");
}

export async function DeleteTodoAction(id: string) {
  await DeleteTodo(id);

  revalidatePath("/");
}
