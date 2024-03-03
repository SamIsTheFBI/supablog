import SignOutButton from "@/components/auth/SignOutButton"
import { getUserAuth } from "@/server/auth/utils"

export default async function DashboardPage() {
  const { session } = await getUserAuth()
  return (
    <>
      <main className="space-y-2 p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">User Data</h1>
        <pre className="bg-secondary p-2 rounded-md overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
        <SignOutButton />
      </main>
    </>
  )
}
