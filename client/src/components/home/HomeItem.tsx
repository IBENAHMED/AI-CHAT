import "./HomeItem.css"
import Link from "next/link"

export default function HomeItem() {
  return (
    <article>
      <header>
        <nav className={"flex justify-between items-center px-5 py-3 bg-[#212121]"}>
          <Link href={"/home"} className={"flex gap-2.5 items-center"}>
            <img src={"/logo.png"} alt={"image logo"} className={"w-10 h-10"} />
            <span className={"text-white"}>LAMA AI</span>
          </Link>
        </nav>
      </header>
      <div className="homepage bg-[#212121]">
        <div className="homepage_container">
          <div className="left">
            <h1>CHAT AI</h1>
            <h2>Supercharge your creativity and productivity</h2>
            <h3>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat sint
              dolorem doloribus, architecto dolor.
            </h3>
            <Link href="/dashboard">Get Started</Link>
          </div>
          <div className="right">
            <div className="imgContainer">
              <div className="bgContainer">
                <div className="bg"></div>
              </div>
              <img src="/bot.png" alt="" className="bot" />
            </div>
          </div>
        </div>
        <div className="terms">
          <img src="/logo.png" alt="" />
          <div className="links">
            <Link href="/">Terms of Service</Link>
            <span>|</span>
            <Link href="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </article>
  )
}