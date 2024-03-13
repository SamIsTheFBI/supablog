import AddTodoForm from "@/components/home/add-todo-form";
import TodoItem from "@/components/home/todo-item";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { getData } from "@/server/actions/todoActions";

export default async function Home() {
  const todos = await getData()
  return (
    <>
      <Header />
      <main className="space-y-6 text-center p-4">
        <div className="space-y-2 mt-16">
          <p className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            A generic template for Nextjs apps.
          </p>
          <p className="text-muted-foreground">I am trying to build a starter layout kind of thing for my Nextjs projects.</p>
        </div>
        <div className="max-w-96 mx-auto px-2">
          <Card className="p-4 space-y-4">
            <AddTodoForm />
            <ul className="space-y-2">
              {todos.length > 0 && todos.map((todo) => (
                <TodoItem key={todo.id} id={todo.id} todo={todo.text} />
              )) || <span>No items</span>}
            </ul>
          </Card>
        </div>
      </main>
    </>
  );
}
