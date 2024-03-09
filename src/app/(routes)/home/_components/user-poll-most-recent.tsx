import Image from 'next/image'

import { getUserPollMostRecent } from '@/actions/get-user-poll-most-recent'
import { PollCard } from '@/components/cards/poll-card'
import { Description } from '@/components/description'
import { Error } from '@/components/error'
import { Title } from '@/components/title'

export async function UserPollMostRecent() {
  const poll = await getUserPollMostRecent()

  if (!poll) {
    return <Error className="max-w-2xl">Algo deu errado</Error>
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="w-full h-full p-6 rounded-md gap-y-4">
        <Image
          src="/recent-poll.svg"
          alt="Networking"
          height={150}
          width={150}
          className="mx-auto aspect-square"
        />
        <div>
          <Title variant="sub">
            Esta é a sua última enquete criada na página
          </Title>
          <Description>
            Crie enquetes e compartilhe com seus amigos.
          </Description>
        </div>
      </div>

      <PollCard
        key={poll.id}
        createdAt={poll.createdAt}
        isSelfUser
        options={poll.options}
        pollId={poll.id}
        title={poll.title}
        votes={poll.votes}
      />
    </div>
  )
}
