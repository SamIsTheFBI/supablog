import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import ThemeDropdown from "./ThemeDropdown"
import { LuBookOpen, LuGithub, LuLayoutDashboard, LuLogIn, LuStickyNote } from "react-icons/lu"
import { BsStars } from "react-icons/bs";
import { getUserAuth } from "@/server/auth/utils"
import Image from "next/image"
import { getUserById } from "@/server/actions/blogActions"
import UserPfpBox from "../dashboard/user-pfp-box"

export default async function SheetMenu() {
  const session = await getUserAuth()

  return (
    <>
      <Sheet>
        <SheetTrigger className="sm:hidden p-2 border border-primary rounded-md"><HamburgerMenuIcon /></SheetTrigger>
        <SheetContent>
          <SheetHeader className="-mt-4">
            <ThemeDropdown />
            <div className="flex gap-x-4 p-2 border border-foreground/30 rounded-md">
              <div className="size-16 bg-secondary rounded-md inline-block"></div>
              <div className="grid text-left items-center">
                <Link href="/" className="inline-block font-bold">FBK.</Link>
                <Link className="text-xs inline-flex items-center gap-x-2 border border-secondary rounded-sm px-1" href="https://github.com/SamIsTheFBI/supablog/"><LuGithub />Source Code</Link>
              </div>
            </div>
          </SheetHeader>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col divide-y mt-2">
              <Link href="/#features" className="hover:bg-secondary px-4 py-2 flex justify-start items-center gap-x-4"><BsStars />Features</Link>
              <Link href="/docs" className="hover:bg-secondary px-4 py-2  flex justify-start items-center gap-x-4"><LuStickyNote />Documentation</Link>
              <Link href="/blog" className="hover:bg-secondary px-4 py-2 flex justify-start items-center gap-x-4 "><LuBookOpen />Blog</Link>
              {session.session?.user &&
                <Link href="/dashboard" className="hover:bg-secondary px-4 py-2 flex justify-start items-center gap-x-4 "><LuLayoutDashboard />Dashboard</Link>
              }
            </div>
            <div>
              {session.session?.user
                &&
                <div className="border-t pt-4 mb-28">
                  <Link href="/dashboard">
                    <UserPfpBox />
                  </Link>
                </div>
                ||
                <div className="w-full mb-24">
                  <div className="flex justify-between gap-x-4 px-2 py-4 ">
                    <Link href="/sign-in" className="hover:bg-secondary text-left flex justify-start items-center gap-x-4 w-full  px-4 py-2">
                      <LuLogIn />
                      Sign In
                    </Link>
                  </div>
                </div>
              }
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
