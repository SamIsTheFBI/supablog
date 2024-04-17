import { FaGoogle } from "react-icons/fa"
import { Button } from "../ui/button"

export default function OauthOptions() {
  return (
    <div className="flex flex-col gap-y-2">
      <Button variant="outline" asChild className="flex justify-start w-full items-center gap-x-4">
        <a href="/oauth/google">
          <FaGoogle />
          <span>
            Continue with Google
          </span>
        </a>
      </Button>
    </div>
  )
}
