'use client'

import { UserButton, useAuth } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'

export function NavActions() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { signOut, sessionId } = useAuth()
  const router = useRouter()
  const signInUrl = process.env.NEXT_PUBLIC_APP_URL!

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1500)
  }, [])

  function handleSignOut() {
    startTransition(async () => {
      await signOut({ sessionId: sessionId || undefined })

      router.push(signInUrl)
    })
  }

  return (
    <>
      <ModeToggle />
      {!isLoaded && <Spinner />}
      {isLoaded && (
        <>
          <UserButton afterSignOutUrl={signInUrl} />
          <Button
            onClick={handleSignOut}
            disabled={isPending}
            variant="secondary"
            className="hidden md:inline-flex"
          >
            {isPending ? (
              <>
                <Spinner className="mr-2" />
                Saindo
              </>
            ) : (
              <>
                <LogOut className="size-4 mr-2" />
                Sair
              </>
            )}
          </Button>
          <Button
            onClick={handleSignOut}
            disabled={isPending}
            variant="secondary"
            className="inline-flex md:hidden p-0 size-9"
          >
            {isPending ? <Spinner /> : <LogOut className="size-4" />}
          </Button>
        </>
      )}
    </>
  )
}
