import Link from "next/link"
import {SignIn, UserButton} from "@clerk/nextjs"

export default function Page() {
  return (
    <div className={"w-full h-screen"}>
      <header>
        <nav className={"flex justify-between items-center px-5 py-3 bg-[#212121]"}>
          <Link href={"/home"} className={"flex gap-2.5 items-center"}>
            <img src={"/logo.png"} alt={"image logo"} className={"w-10 h-10"} />
            <span className={"text-white"}>LAMA AI</span>
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
