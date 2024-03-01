"use client"

import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <>
      <Header />
      <main className="space-y-6 text-center">
        <section className="space-y-2 mt-20">
          <p className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            A generic template for Nextjs apps.
          </p>
          <p className="text-muted-foreground">I am trying to make a starter layout kind of thing for my Nextjs projects.</p>
        </section>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      </main>
    </>
  );
}
