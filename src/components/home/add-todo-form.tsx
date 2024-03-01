"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { addTodo } from "@/server/actions/todoActions";
import { Input } from "../ui/input";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const formSchema = z.object({
  text: z.string().min(1),
})

export default function AddTodoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTodo(values.text)
  }

  const { pending } = useFormStatus()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-4 flex items-baseline">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="📝 Add todos.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending}>Add Item</Button>
      </form>
    </Form>
  )
}
