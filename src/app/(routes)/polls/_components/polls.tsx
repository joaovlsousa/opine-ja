import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { getUserPolls } from '@/actions/get-user-polls'
import { PollCard } from '@/components/cards/poll-card'
import { Error } from '@/components/error'
import { Button } from '@/components/ui/button'

export async function Polls() {
  const polls = await getUserPolls()

  if (!polls) {
    return (
      <Error className="max-w-lg">
        Não foi possível carregar suas enquetes
      </Error>
    )
  }

  if (!polls.length) {
    return (
      <div className="max-w-lg space-y-3">
        <Error>Você não criou nenhuma enquete</Error>
        <Button variant="secondary" asChild>
          <Link href="/new">
            Criar uma enquete
            <ArrowRight className="size-3 ml-2" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {polls.map((poll) => (
        <PollCard
          key={poll.id}
          pollId={poll.id}
          createdAt={poll.createdAt}
          options={poll.options}
          title={poll.title}
          votes={poll.votes}
          isSelfUser
        />
      ))}
    </div>
  )
}
