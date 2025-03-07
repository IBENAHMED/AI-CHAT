"use client"

import Link from "next/link"
import {SignedIn, UserButton} from "@clerk/nextjs"
import Logo from "@/components/icon/Logo"

export default function Navbar() {
  return (
    <SignedIn>
      <header>
        <nav className={"flex justify-between items-center px-5 py-3 bg-[#212121]"}>
          <Link href={"/home"} className={"flex gap-2.5 items-center"}>
            <Logo />
            <span className={"text-white"}>UNICORN AI</span>
          </Link>
          <UserButton />
        </nav>
      </header>
    </SignedIn>
  )
}
