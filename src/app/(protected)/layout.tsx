import { getUserAuth } from "@/server/auth/utils";
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserAuth();
  if (!session?.session) redirect("/sign-in");

  return (<div className="">{children}</div>);
}
