import { Footer } from './_components/footer'
import { Heading } from './_components/heading'
import { Navbar } from './_components/navbar'

export default function MarketingPage() {
  return (
    <div className="h-full">
      <Navbar />
      <div className="min-h-full pt-28 md:pt-40 flex flex-col">
        <div className="flex flex-col items-center justify-center md:justify-start text-center flex-1 px-6 pb-10">
          <Heading />
        </div>
        <Footer />
      </div>
    </div>
  )
}
