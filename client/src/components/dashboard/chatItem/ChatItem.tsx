"use client"

import "./ChatItem.css"

import {usePathname} from "next/navigation"
import React, {useEffect, useRef, useState} from "react"
import {useStateContext} from "@/components/context/StateContext"

import model from "@/lib/gemini"
import remarkGfm from "remark-gfm"
import {IKImage} from "imagekitio-next"
import ReactMarkdown from "react-markdown"

import Navbar from "@/components/navbar/Navbar"
import Upload from "@/components/upload/Upload"
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT

export default function ChatItem() {
  const queryClient = useQueryClient()

  const {value} = useStateContext()

  const endRef: any = useRef(null)
  const formRef: any = useRef(null)
  const hasRun = useRef(false)

  const [question, setQuestion]: any = useState(null)
  const [answer, setAnswer]: any = useState(null)
  const [img, setImg]: any = useState({isLoading: false, error: "", dbData: {}, aiData: {}})

  const path = usePathname()
  const chatId = path.split("/").pop()

  useEffect(() => {
    if (!hasRun.current) {
      handleSubmit(null, value)
    }
    hasRun.current = true
  }, [])

  useEffect(() => {
    endRef.current.scrollIntoView({behavior: "smooth"})
  }, [question, answer, img.dbData])

  const {isPending, error, data} = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`http://localhost:3200/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  })

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{text: "Hello, i have 2 days in way hous"}],
      },
      {
        role: "model",
        parts: [{text: "Greate to meet you"}],
      },
    ],
    generationConfig: {},
  })

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`http://localhost:3200/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["chat", data._id]}).then(() => {
        formRef.current.reset()
        setQuestion("")
        setAnswer("")
        setImg({
          isLoading: false,
          error: "",
          dbData: {},
          aiData: {},
        })
      })
    },
  })

  const handleSubmit = async (e: any, value: any) => {
    if (e) {
      e.preventDefault()
      var prompt = e.target.text.value
    } else {
      prompt = value
    }
    if (!prompt) return
    setQuestion(prompt)
    try {
      const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, prompt] : [prompt])
      let res = ""
      for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        res += chunkText
        setAnswer(res)
      }

      mutation.mutate()
    } catch (error) {
      alert("Error generating content")
    }
  }

  return (
    <article>
      <nav className={"sticky top-0 z-50"}>
        <Navbar />
      </nav>
      <div className={"flex items-start"}>
        <div className={"sticky top-13 z-50"}>
          <DashboardLayout />
        </div>
        <div className={"flex-1"}>
          <div className='chatPage'>
            <div className='wrapper'>
              <div className='chat text-white'>
                {isPending
                  ? "Loading..."
                  : error
                    ? "Something went wrong!"
                    : data?.history?.map((message: any, i: any) => (
                        <React.Fragment key={i}>
                          {message.img && <IKImage urlEndpoint={urlEndpoint} path={message.img} height='300' width='400' loading='lazy' lqip={{active: true, quality: 20}} alt='Alt text' />}
                          <div className={message.role === "user" ? "message user" : "message"} key={i}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.parts[0].text}</ReactMarkdown>
                          </div>
                        </React.Fragment>
                      ))}
                {img.dbData.filePath && <IKImage urlEndpoint={urlEndpoint} path={img.dbData.filePath} width={200} height={200} alt='Alt text' />}
                {question && <div className={"text-white message user"}>{question}</div>}
                {answer && (
                  <div className='text-white message'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={"flex justify-center pb-2 pt-5 bg-[#11101C]"}>
            <form className={"newForm"} onSubmit={(e) => handleSubmit(e, null)} ref={formRef}>
              <Upload setImg={setImg} />
              <input id={"file"} type={"file"} multiple={false} hidden />
              <input type={"text"} name={"text"} placeholder={"Ask anything..."} />
              <button type='submit' ref={endRef}>
                <img className={"w-5 h-5 cursor-pointer"} src={"/arrow.png"} alt={"arrow image"} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </article>
  )
}
