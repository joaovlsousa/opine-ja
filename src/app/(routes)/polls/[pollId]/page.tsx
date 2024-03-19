import { notFound } from 'next/navigation'

import { getPollWithId } from '@/actions/get-poll-with-id'
import { Title } from '@/components/title'
import { PollVoteForm } from './_components/poll-vote-form'

export default async function PollIdPage({
  params,
}: {
  params: { pollId: string }
}) {
  const { error, poll } = await getPollWithId(params.pollId)

  if (error || !poll) {
    notFound()
  }

  return (
    <main className="space-y-6">
      <Title>Enquete</Title>

      <div className="space-y-3">
        <Title variant="sm">{poll.title}</Title>
        <PollVoteForm pollId={poll.id} options={poll.options} />
      </div>
    </main>
  )
}
