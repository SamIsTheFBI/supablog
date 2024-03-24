import { LuUser2 } from "react-icons/lu";
import UserPfpBox from "../dashboard/user-pfp-box";
import Link from "next/link";
import DashboardSidebarItems from "./dashboard-sidebar-items";

export default async function Sidebar() {
  return (
    <aside className="min-w-64 sidebar-height sticky top-16 bg-muted/65 hidden lg:block rounded-md p-4 my-4 border border-border shadow-md dark:shadow-black">
      <UserPfpBox />
      <DashboardSidebarItems />
    </aside>
  )
}
