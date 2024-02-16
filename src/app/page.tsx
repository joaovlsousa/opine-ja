import { SignInButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <p>hello world</p>
      <SignInButton mode="modal">
        <Button size="lg">Entrar</Button>
      </SignInButton>
    </div>
  )
}
