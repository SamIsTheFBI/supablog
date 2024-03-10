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
      <Header />
      {children}
      <Toaster />
    </>
  );
}
