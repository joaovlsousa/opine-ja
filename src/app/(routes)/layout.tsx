import { Navbar } from './_components/navbar'
import { Sidebar } from './_components/sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen dark:bg-background/35">
      <Navbar />
      <Sidebar />
      <main className="pt-20 md:ml-56">
        <section className="m-auto w-full md:w-[30rem] lg:w-[60rem] px-4 py-6 md:px-0">
          {children}
        </section>
      </main>
    </div>
  )
}
