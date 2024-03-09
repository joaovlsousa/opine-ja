import { Suspense } from 'react'

import { Description } from '@/components/description'
import { Title } from '@/components/title'
import { PollsSkeleton } from '@/components/polls-skeleton'
import { Polls } from './_components/polls'

export default function PollsPage() {
  return (
    <div className="space-y-6">
      <header>
        <Title>Suas enquetes</Title>
        <Description>
          Acompanhe as enquetes que você publicou na página
        </Description>
      </header>
      <Suspense fallback={<PollsSkeleton />}>
        <Polls />
      </Suspense>
    </div>
  )
}
