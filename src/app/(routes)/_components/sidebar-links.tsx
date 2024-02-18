'use client'

import { Home, Plus, SquareStack } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SidebarLinks() {
  const pathname = usePathname()

  const links = [
    {
      label: 'Início',
      href: '/home',
      icon: Home,
    },
    {
      label: 'Nova enquete',
      href: '/new',
      icon: Plus,
    },
    {
      label: 'Suas enquetes',
      href: '/polls',
      icon: SquareStack,
    },
  ]

  return (
    <div className="space-y-2">
      {links.map((link) => (
        <Button
          key={link.href}
          asChild
          variant="ghost"
          className={cn(
            'w-full justify-start group hover:bg-secondary',
            pathname === link.href && 'bg-secondary',
          )}
        >
          <Link href={link.href}>
            <link.icon
              className={cn(
                'size-4 mr-2',
                pathname === link.href && 'text-amber-500',
              )}
            />
            <p>{link.label}</p>
          </Link>
        </Button>
      ))}
    </div>
  )
}
