'use client'

import { SignOutButton, UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'

export function NavActions() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1500)
  }, [])

  return (
    <>
      <ModeToggle />
      {!isLoaded && <Spinner />}
      {isLoaded && (
        <>
          <UserButton />
          <SignOutButton>
            <>
              <Button variant="secondary" className="hidden md:inline-flex">
                <LogOut className="size-4 mr-2" />
                Sair
              </Button>
              <Button
                variant="secondary"
                className="inline-flex md:hidden p-0 size-9"
              >
                <LogOut className="size-4" />
              </Button>
            </>
          </SignOutButton>
        </>
      )}
    </>
  )
}
