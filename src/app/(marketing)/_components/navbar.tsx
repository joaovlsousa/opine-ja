'use client'

import { SignInButton, UserButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/logo'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { isSignedIn } = useAuth()
  const scrolled = useScrollTop()

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1500)
  }, [])

  return (
    <div
      className={cn(
        'z-50 fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm',
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!isLoaded && <Spinner size="lg" />}
        {!isSignedIn && isLoaded && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="lg">
                Entrar
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button>Criar conta</Button>
            </SignInButton>
          </>
        )}
        {isSignedIn && isLoaded && (
          <>
            <Button variant="ghost" asChild>
              <Link href="/home">Entre agora</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}
