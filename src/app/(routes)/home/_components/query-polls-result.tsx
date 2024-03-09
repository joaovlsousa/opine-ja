import { auth } from '@clerk/nextjs'

import { getPollsWithTitle } from '@/actions/get-poll-with-title'
import { PollCard } from '@/components/cards/poll-card'
import { Error } from '@/components/error'
import { Spinner } from '@/components/spinner'
import { Title } from '@/components/title'

export async function QueryPollResults({ title }: { title: string }) {
  const { userId } = auth()
  const { error, polls } = await getPollsWithTitle(title)

  if (error || !polls) {
    return <Error className="max-w-2xl">{error}</Error>
  }

  return (
    <main className="space-y-4">
      <Title>Resultados</Title>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            createdAt={poll.createdAt}
            isSelfUser={userId === poll.userId}
            options={poll.options}
            pollId={poll.id}
            title={poll.title}
            votes={poll.votes}
          />
        ))}
      </div>
    </main>
  )
}

export function QueryPollResultsSkeleton() {
  return (
    <div className="w-full mt-20 flex justify-center">
      <Spinner />
    </div>
  )
}
