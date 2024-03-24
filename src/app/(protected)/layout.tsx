import Header from "@/components/layout/Header";
import ThemeDropdown from "@/components/layout/ThemeDropdown";
import SheetMenu from "@/components/layout/sheet-menu";
import { Toaster } from "@/components/ui/sonner";
import { checkAuth } from "@/server/auth/utils";
import Link from "next/link";

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
      <Toaster closeButton />
    </>
  );
}
