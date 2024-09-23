import { AddTodo } from "@/components/todos/AddTodo";
import TodoList from "@/components/todos/TodoList";

import { GetTodos } from "@/lib/todo";

export default async function Home() {
  const data = await GetTodos();

  return (
    <div>
      <div className="container mx-auto py-4">
        <div className="flex justify-center flex-col gap-y-5 items-center">
          <h1 className="text-2xl md:text-4xl font-bold uppercase">
            Todo app with server action
          </h1>
          <h2 className="text-lg md:text-5xl font-bold text-sky-500">
            By: Devct
          </h2>
        </div>
        {/* add todo  */}
        <div className="mt-10">
          <AddTodo />
        </div>

        {/* get todo ? */}

        <div className="mt-8">
          <ul className="flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground rounded-lg border shadow-md">
            {data.map((todo) => (
              <TodoList key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
