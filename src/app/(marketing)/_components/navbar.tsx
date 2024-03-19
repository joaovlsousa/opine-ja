import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

import { Logo } from '@/components/logo'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'

export function Navbar() {
  return (
    <nav className="z-50 fixed top-0 flex items-center w-full p-6">
      <Logo />
      <div className="ml-auto justify-end w-full flex items-center gap-x-4">
        <ClerkLoading>
          <Spinner />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="lg">
                Entrar
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button>Criar conta</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button variant="ghost" asChild>
              <Link href="/home">Explorar</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </ClerkLoaded>

        <ModeToggle />
      </div>
    </nav>
  )
}
