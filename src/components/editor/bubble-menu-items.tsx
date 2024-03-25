import { Editor } from "@tiptap/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LuLink } from "react-icons/lu";
import { Input } from "../ui/input";

export default function BubbleMenuItems({ editor }: { editor: Editor }) {
  return (
    <div className="flex items-center bg-background border p-1 rounded-md">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
          >
            <LuLink />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-x-2">
            <Input
              type="text"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  editor
                    .chain()
                    .focus()
                    .setLink({
                      href: (event.target as HTMLInputElement).value,
                      target: "_blank",
                    })
                    .run();
                }
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
