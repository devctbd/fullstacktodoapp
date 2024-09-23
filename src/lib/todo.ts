import prisma from "@/lib/prisma";

export async function GetTodos() {
  const data = await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      isCompleted: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function CreateTodo(title: string) {
  try {
    const data = await prisma.todo.create({
      data: {
        title,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
}

export async function changeTodoStatus(id: string, isCompleted: boolean) {
  try {
    const data = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
}

export async function EditTodo(newTitle: string, newId: string) {
  try {
    const data = await prisma.todo.update({
      where: {
        id: newId,
      },
      data: {
        title: newTitle,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
}

export async function DeleteTodo(id: string) {
  try {
    const data = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
}
