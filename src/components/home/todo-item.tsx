"use client"

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { deleteTodo } from "@/server/actions/todoActions";

export default function TodoItem({ id, todo }: { id: number, todo: string }) {
  return (
    <li key={id} className="flex items-center justify-between py-1 pl-3 border rounded-md bg-secondary">
      <span>{todo}</span>
      <Button variant="ghost" onClick={() => deleteTodo(id)}><Cross1Icon /></Button>
    </li>
  )
}
