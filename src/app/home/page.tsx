import Link from "next/link"

export default function page() {
  return (
    <div>
      <Link href={"/dashboard"}>go to dashboard</Link>
    </div>
  )
}