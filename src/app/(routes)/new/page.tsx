import { Description } from '@/components/description'
import { Title } from '@/components/title'

import { NewPollForm } from './_components/new-poll-form'

export default function NewPollPage() {
  return (
    <div className="space-y-4 md:max-w-md">
      <header>
        <Title>Nova enquete</Title>
        <Description>Crie uma nova enquete</Description>
      </header>
      <NewPollForm />
    </div>
  )
}
