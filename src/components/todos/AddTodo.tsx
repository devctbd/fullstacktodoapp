"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddTodoAction } from "@/action";

const FormSchema = z.object({
  title: z
    .string()
    .transform((value) => value.replace(/\s+/g, " "))
    .pipe(z.string().min(2)),
});

export function AddTodo() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const title = data.title;

    await AddTodoAction(title);

    toast({
      title: "Sucess",
      description: "Todo added successfully",
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full px-4 md:px-0"
      >
        <div className="flex">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Add todo"
                    className=" border-r-0 rounded-r-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            variant="outline"
            type="submit"
            className="rounded-l-none uppercase"
          >
            Add Todo
          </Button>
        </div>
      </form>
    </Form>
  );
}
