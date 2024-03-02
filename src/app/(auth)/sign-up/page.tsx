import SignUpForm from "@/components/auth/SignUpForm";
import ThemeDropdown from "@/components/layout/ThemeDropdown";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <header>
        <div className="max-w-7xl w-full mx-auto px-4 flex h-12 items-center space-x-4 justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">FBK.</span>
            </Link>
          </div>
          <ThemeDropdown />
        </div>
      </header>
      <main className="flex space-y-6">
        <section className="m-auto mt-6">
          <SignUpForm />
        </section>
      </main>
    </>
  )
}
