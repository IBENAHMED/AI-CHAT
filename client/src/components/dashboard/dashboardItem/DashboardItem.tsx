"use client"

import "./DashboardItem.css"

import {useRouter} from "next/navigation"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {useStateContext} from "@/components/context/StateContext"

import Logo from "@/components/icon/Logo"

export default function DashboardItem() {
  const {setValue} = useStateContext()

  const queryClient = useQueryClient()

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch("http://localhost:3200/api/chats", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text}),
      }).then((res) => res.json())
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({queryKey: ["userChats"]})
      router.push(`/dashboard/chat/${id}`)
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const text = e.target.text.value
    setValue(text)
    if (!text) return

    mutation.mutate(text)
  }

  return (
    <div className='dashboardPage'>
      <div className='texts'>
        <div className='logo'>
          <Logo />
          <h1>UNICORN AI</h1>
        </div>
        <div className='options'>
          <div className='option'>
            <img src='/chat.png' alt='' />
            <span className={"text-white"}>Create a New Chat</span>
          </div>
          <div className='option'>
            <Logo />
            <span className={"text-white"}>Analyze Images</span>
          </div>
          <div className='option'>
            <img src='/code.png' alt='' />
            <span className={"text-white"}>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className='formContainer mb-3'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type='text' name='text' placeholder='Ask me anything...' />
          <button type='submit'>
            <img src='/arrow.png' alt='' />
          </button>
        </form>
      </div>
    </div>
  )
}
