import { Suspense } from 'react'

import { SearchPoll } from '@/app/(routes)/_components/search-poll'
import { Description } from '@/components/description'
import { PollsSkeleton } from '@/components/polls-skeleton'
import { Title } from '@/components/title'
import { PollsMostVoted } from './_components/polls-most-voted'
import {
  QueryPollResults,
  QueryPollResultsSkeleton,
} from './_components/query-polls-result'
import { UserPollMostRecent } from './_components/user-poll-most-recent'
import { UserPollMostVoted } from './_components/user-poll-most-voted'
import { UserPollSectionSkeleton } from './_components/user-poll-section-skeleton'

export default function HomePage({
  searchParams,
}: {
  searchParams: { search: string | undefined }
}) {
  if (searchParams.search) {
    return (
      <div className="space-y-6 md:space-y-0">
        <SearchPoll isMobile />

        <Suspense fallback={<QueryPollResultsSkeleton />}>
          <QueryPollResults title={searchParams.search} />
        </Suspense>
      </div>
    )
  }

  return (
    <>
      <div className="pb-6 md:py-0">
        <SearchPoll isMobile />
      </div>
      <main className="space-y-6">
        <section>
          <Title>Explorar</Title>
          <Description>Veja as enquetes mais votadas da página</Description>
          <div className="mt-4">
            <Suspense fallback={<PollsSkeleton />}>
              <PollsMostVoted />
            </Suspense>
          </div>
        </section>

        <section className="space-y-6">
          <header>
            <Title>Últimas interações na página</Title>
            <Description>
              Veja algumas interações mais recentes na página
            </Description>
          </header>
          <div className="space-y-2">
            <Title variant="sub">Enquete mais votada</Title>
            <Suspense fallback={<UserPollSectionSkeleton />}>
              <UserPollMostVoted />
            </Suspense>
          </div>
          <div className="space-y-2">
            <Title variant="sub">Enquete mais recente</Title>
            <Suspense fallback={<UserPollSectionSkeleton />}>
              <UserPollMostRecent />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  )
}
