import Link from "next/link"
import {SignIn, UserButton} from "@clerk/nextjs"
import Logo from "@/components/icon/Logo"

export default function Page() {
  return (
    <div className={"w-full h-screen bg-[#212121]"}>
      <header>
        <nav className={"flex justify-between items-center px-5 py-3"}>
          <Link href={"/home"} className={"flex gap-2.5 items-center"}>
            <Logo />
            <span className={"text-white"}>UNICORN AI</span>
          </Link>
          <UserButton />
        </nav>
      </header>
      <div className={"flex justify-center items-center bg-[#212121]"} style={{height: "calc(100% - 63.98px)"}}>
        <SignIn forceRedirectUrl={"/dashboard"} />
      </div>
    </div>
  )
}
