"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditTodoAction } from "@/action";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserRoundPen } from "lucide-react";
import { Todo } from "@prisma/client";

const FormSchema = z.object({
  newTitle: z.string(),

  newId: z.string(),
});

interface editTodoProps {
  todo: Todo;
}

export function EditTodoPage({ todo }: editTodoProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newTitle: todo.title,
      newId: todo.id,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await EditTodoAction(data.newTitle, data.newId);

    toast({
      title: "Sucess",
      description: "Todo update successfully",
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <UserRoundPen className=" cursor-pointer hover:text-yellow-500 " />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure edit this todo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full px-4 md:px-0 flex flex-col gap-4 justify-center "
              >
                <FormField
                  control={form.control}
                  name="newId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Update Todo"
                          className=""
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="secondary">
                  Update
                </Button>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
