"use client"

import Link from "next/link";
import { LuBook, LuLayoutDashboard, LuUser2 } from "react-icons/lu";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";

export default function DashboardSidebarItems() {
  const dashboardProfile = "/profile"
  const pathname = usePathname()
  return (
    <ul className="space-y-4 py-4">
      <li>
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-x-3 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-primary/15",
            pathname == "/dashboard" && "font-bold border-l-primary border-l-[5px]"
          )}>
          <LuLayoutDashboard />
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/profile"
          className={cn(
            "flex items-center gap-x-3 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-primary/15",
            pathname.includes("/profile") && "font-bold border-l-primary border-l-[5px]"
          )}>
          <LuUser2 />
          <span>Profile</span>
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/posts"
          className={cn(
            "flex items-center gap-x-3 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-primary/15",
            pathname.includes("/posts") && "font-bold border-l-primary border-l-[5px]"
          )}>
          <LuBook />
          <span>Posts</span>
        </Link>
      </li>
    </ul>
  )
}
