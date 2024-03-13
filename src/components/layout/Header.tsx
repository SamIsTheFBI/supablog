import Link from "next/link";
import Navbar from "./Navbar";
import { getUserAuth } from "@/server/auth/utils";
import SheetMenu from "./sheet-menu";
import ThemeDropdown from "./ThemeDropdown";

export default async function Header() {
  const session = await getUserAuth()
  return (
    <header className="h-12 sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="max-w-7xl w-full mx-auto p-4 flex h-12 items-center space-x-4 justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">FBK.</span>
          </a>
        </div>
        <div className="flex max-sm:hidden items-center gap-6 justify-between">
          <Navbar />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="max-sm:hidden">
            <ThemeDropdown />
          </div>
          {session?.session &&
            <Link
              href="/dashboard"
              className="text-sm max-sm:hidden font-medium text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            ||
            <Link
              href="/sign-in"
              className="text-sm max-sm:hidden font-medium text-muted-foreground hover:text-foreground">
              Sign In
            </Link>
          }
          <SheetMenu />
        </div>
      </div>
    </header>
  )
}
