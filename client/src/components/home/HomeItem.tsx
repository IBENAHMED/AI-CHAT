import "./HomeItem.css"

import Link from "next/link"
import Logo from "@/components/icon/Logo"

export default function HomeItem() {
  return (
    <article className={"bg-[#212121]"}>
      <header>
        <nav className={"flex justify-between items-center px-5 py-3"}>
          <Link href={"/home"} className={"flex gap-2.5 items-center"}>
            <Logo />
            <span className={"text-white"}>UNICORN AI</span>
          </Link>
        </nav>
      </header>
      <div className='homepage mt-10'>
        <div className='homepage_container'>
          <div className='left'>
            <h1>CHAT AI</h1>
            <h2>Supercharge your creativity and productivity</h2>
            <h3>ChatAI helps you get answers, find inspiration and be more productive. It is free to use and easy to try. Just ask and ChatAI can help with writing.</h3>
            <Link href='/dashboard'>Get Started</Link>
          </div>
          <div className='right'>
            <div className='imgContainer'>
              <div className='bgContainer'>
                <div className='bg'></div>
              </div>
              <img src='/bot.png' alt='' className='bot' />
            </div>
          </div>
        </div>
        <div className='terms mt-5'>
          <Logo />
          <div className='links'>
            <Link href='/'>Terms of Service</Link>
            <span>|</span>
            <Link href='/'>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
