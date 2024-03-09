import { Logo } from '@/components/logo'

import { MobileSidebar } from './mobile-sidebar'
import { NavActions } from './nav-actions'
import { SearchPoll } from './search-poll'

export function Navbar() {
  return (
    <nav className="fixed z-50 w-full h-20 px-4 md:px-8 flex items-center justify-between bg-background shadow">
      <div className="flex items-center gap-x-2">
        <MobileSidebar />
        <Logo showName />
      </div>
      <SearchPoll />
      <div className="flex items-center gap-x-4 md:gap-x-6">
        <NavActions />
      </div>
    </nav>
  )
}
