import Navbar from "@/components/navbar/Navbar"
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout"

export default function page() {
  return (
    <article>
      <Navbar />
      <DashboardLayout>
        dashboard
      </DashboardLayout>
    </article>
  )
}