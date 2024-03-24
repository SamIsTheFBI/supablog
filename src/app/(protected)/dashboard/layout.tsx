import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/sidebar";
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
        <Sidebar />
        {children}
      </main>
    </>
  );
}

