import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 items-center">
      <Link
        href="#"
        className="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Features
      </Link>
    </nav>
  )
}
