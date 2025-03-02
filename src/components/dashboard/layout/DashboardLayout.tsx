"use client"

import { useEffect, useId } from "react"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function DashboardLayout({children}: any) {
  const {userId, isLoaded} = useAuth()
  
  useEffect(() => {
    if (isLoaded && !useId) {
      redirect("/sign-in")
    }

  }, [userId, isLoaded])

  if (!isLoaded) return "DashboardLayout Loading..."

  return (
    <article className={"DashboardLayout"}>
      <div className={"menu"}>MENU</div>
      <div className={"content"}>
        {children}
      </div>
    </article>
  )
}