import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'

export function Heading() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Comece uma pesquisa ou expresse suas opiniões. <br />{' '}
        <span className="text-amber-500">Tudo num só lugar!</span>
      </h1>
      <ClerkLoading>
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <Button asChild size="lg">
            <Link href="/home">
              Explorar
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </SignedIn>
      </ClerkLoaded>
      <ClerkLoaded>
        <SignedOut>
          <SignInButton mode="modal">
            <Button size="lg">
              Comece agora
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </div>
  )
}
