import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { checkAuth } from "@/server/auth/utils";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth()

  return (
    <>
      <main className="sm:px-10 mx-auto flex justify-center gap-x-6">
        <aside className="min-w-52 sidebar-height bg-muted hidden md:block rounded-md p-4 my-4 pt-8 border border-border shadow-inner">
          Sidebar
        </aside>
        {children}
      </main>
    </>
  );
}

