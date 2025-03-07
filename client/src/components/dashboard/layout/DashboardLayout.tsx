"use client"

import Link from "next/link"
import {useEffect, useId} from "react"
import {useAuth} from "@clerk/nextjs"
import {redirect} from "next/navigation"
import {useQuery} from "@tanstack/react-query"

export default function DashboardLayout() {
  const {userId, isLoaded} = useAuth()

  const {isPending, error, data} = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`http://localhost:3200/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  })

  useEffect(() => {
    if (isLoaded && !useId) {
      redirect("/sign-in")
    }
  }, [userId, isLoaded])

  if (!isLoaded) return "DashboardLayout Loading..."

  return (
    <article className={"DashboardLayout"}>
      <div className={"content"}>
        <div className={"chatList flex flex-col justify-between px-3 bg-[#212121]"} style={{height: "calc(100vh - 63.98px)"}}>
          <div>
            <span className={"text-white text-xs"}>dashboard</span>
            <ul className={"mt-1.5"}>
              <li className={"text-white text-sm hover:bg-[#eee] rounded cursor-pointer hover:text-black py-2 px-3"}>
                <Link href='/dashboard'>Create a new Chat</Link>
              </li>
              <li className={"text-white text-sm hover:bg-[#eee] rounded cursor-pointer hover:text-black py-2 px-3"}>
                <Link href='/'>Explore Lama AI</Link>
              </li>
              <li className={"text-white text-sm hover:bg-[#eee] rounded cursor-pointer hover:text-black py-2 px-3"}>
                <Link href='/'>Contact</Link>
              </li>
            </ul>
            <hr className={"my-3 text-gray-600"} />
            <span className={"text-white text-xs"}>recent chat</span>
            <ul className={"mt-1.5"}>
              {isPending
                ? "Loading..."
                : error
                  ? "Something went wrong!"
                  : data?.map((chat: any) => (
                      <li key={chat._id} className={"text-white text-sm hover:bg-[#eee] rounded cursor-pointer hover:text-black py-2 px-3"}>
                        <Link href={`/dashboard/chat/${chat._id}`}>{chat.title}</Link>
                      </li>
                    ))}
            </ul>
            <hr className={"mt-3 text-gray-600"} />
          </div>
          <div className='upgrade flex items-center gap-3 pb-3'>
            <img className={"w-8 h-8"} src='/logo.png' alt='logo image' />
            <div className={"text-white"}>
              <p className={"text-xs"}>Upgrade to Lama AI Pro</p>
              <p className={"text-gray-500 text-xs"}>Get unlimited access to all features</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
