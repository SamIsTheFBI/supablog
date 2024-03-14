"use client";

import { UploadButton } from "@/components/editor/uploadthing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={"https://utfs.io/f/d5332830-ded2-4194-ad64-2a2fed53be3c-shcu3w.jpg"} alt="cover image" fill />
    </main>
  );
}
