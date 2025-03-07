"use client"

import Link from "next/link"
import {SignedIn, UserButton} from "@clerk/nextjs"

export default function Navbar() {

  return (
    <SignedIn>
      <header>
        <nav className={"flex justify-between items-center px-5 py-3 bg-[#212121]"}>
          <Link href={"/home"} className={"flex gap-2.5 items-center"}>
            <img src={"/logo.png"} alt={"image logo"} className={"w-10 h-10"} />
            <span className={"text-white"}>LAMA AI</span>
          </Link>
          <UserButton />
        </nav>
      </header>
    </SignedIn>
  )
}