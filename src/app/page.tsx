import Header from "@/components/layout/Header";

export default async function Home() {
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
      </main>
    </>
  );
}
