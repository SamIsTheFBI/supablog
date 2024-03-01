import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="overflow-hidden h-12 sticky top-0 z-50 w-full border-b bg-background">
      <div className="max-w-7xl w-full mx-auto px-4 flex h-12 items-center space-x-4 justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">FBK.</span>
          </a>
        </div>
        <div className="flex items-center gap-6 justify-between">
          <Navbar />
          <Link
            href="/auth/sign-in"
            className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  )
}
