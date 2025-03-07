import Navbar from "@/components/navbar/Navbar"
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout"
import DashboardItem from "@/components/dashboard/dashboardItem/DashboardItem"

export default function page() {
  return (
    <article>
      <Navbar />
      <div className={"flex items-start"}>
        <DashboardLayout/>
        <div className={"flex-1"}>
          <DashboardItem/>
        </div>
      </div>
    </article>
  )
}