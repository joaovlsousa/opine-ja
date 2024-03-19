import { notFound } from 'next/navigation'

import { getPollWithId } from '@/actions/get-poll-with-id'
import { Description } from '@/components/description'
import { Title } from '@/components/title'
import { EditPollForm } from './_components/edit-poll-form'

export default async function PollIdEditPage({
  params,
}: {
  params: { pollId: string }
}) {
  const { error, poll } = await getPollWithId(params.pollId)

  if (error || !poll) {
    notFound()
  }

  return (
    <main className="space-y-4 md:max-w-md">
      <header>
        <Title>Editar enquete</Title>
        <Description>Atualize os dados da sua enquete</Description>
      </header>
      <EditPollForm options={poll.options} title={poll.title} />
    </main>
  )
}
