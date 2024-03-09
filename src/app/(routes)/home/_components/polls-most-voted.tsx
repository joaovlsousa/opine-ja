import { auth } from '@clerk/nextjs'

import { getPollsMostVoted } from '@/actions/get-polls-most-voted'
import { PollCard } from '@/components/cards/poll-card'
import { Error } from '@/components/error'

export async function PollsMostVoted() {
  const { userId } = auth()

  const polls = await getPollsMostVoted()

  if (!polls || !polls.length) {
    return <Error className="max-w-2xl">Algo deu errado</Error>
  }

  return (
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
  )
}
