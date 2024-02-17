'use client'

import { SignInButton, useAuth } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'

export function Heading() {
  const { isSignedIn } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1500)
  }, [])

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Comece uma pesquisa ou expresse suas opiniões. Tudo num só lugar.
      </h1>
      {!isLoaded && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isSignedIn && isLoaded && (
        <Button asChild size="lg">
          <Link href="/home">
            Comece agora
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isSignedIn && isLoaded && (
        <SignInButton mode="modal">
          <Button size="lg">
            Comece agora
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
