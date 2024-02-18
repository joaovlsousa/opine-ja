import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { SidebarLinks } from './sidebar-links'

interface SidebarProps {
  isMobile?: boolean
}

export function Sidebar({ isMobile }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col',
        !isMobile &&
          'hidden md:flex fixed top-20 left-0 w-56 h-[calc(100vh-5rem)] p-4 shadow-2xl',
      )}
    >
      <SidebarLinks />
      <div
        className={cn(
          'flex items-baseline justify-center gap-x-2',
          isMobile ? 'absolute bottom-4 left-10' : 'mt-auto',
        )}
      >
        <p className="text-xs text-sky-500 pt-1">
          &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs text-muted-foreground">by</p>
        <Button variant="link" asChild className="text-xs p-0 underline">
          <Link href="https://github.com/joaovlsousa">joaovlsousa</Link>
        </Button>
      </div>
    </aside>
  )
}
