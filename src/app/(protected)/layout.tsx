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
      <header className="border-b">
        <div className="max-w-7xl w-full mx-auto px-4 flex h-12 items-center space-x-4 justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">FBK.</span>
            </Link>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
