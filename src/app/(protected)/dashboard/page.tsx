import { getUserAuth } from "@/server/auth/utils"

export default async function DashboardPage() {
  const { session } = await getUserAuth()
  return (
    <main>
      Dashboard
      {JSON.stringify(session, null, 2)}
    </main>
  )
}
