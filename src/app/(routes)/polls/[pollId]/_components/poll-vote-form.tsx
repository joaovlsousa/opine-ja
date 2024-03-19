'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { BadgeCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { voteOnPoll } from '@/actions/vote-on-poll'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { voteOnPoll as voteOnPollSchema } from '@/schemas'

interface PollVoteFormProps {
  options: {
    title: string
    votes: number
    id: string
  }[]
  pollId: string
}

type VoteOnPoll = z.infer<typeof voteOnPollSchema>

export function PollVoteForm({ pollId, options }: PollVoteFormProps) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<VoteOnPoll>({
    resolver: zodResolver(voteOnPollSchema),
    mode: 'all',
  })

  async function onSubmit(data: VoteOnPoll) {
    const { error, success } = await voteOnPoll({
      pollId,
      pollOptionId: data.pollOptionId,
    })

    if (error) {
      toast.error(error)
    }

    if (success) {
      toast.success(success)
    }
  }

  return (
    <form className="max-w-2xl space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <fieldset id="options" className="flex flex-col space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            id={option.id}
            className="w-full flex items-center justify-between p-4 font-medium rounded-md cursor-pointer border border-border transition has-[:checked]:border-amber-400 has-[:checked]:dark:border-amber-200"
          >
            {option.title}
            <div className="flex items-center gap-x-8">
              <input
                type="radio"
                value={option.id}
                {...register('pollOptionId')}
              />
              <div className="flex items-center gap-x-1">
                <BadgeCheck className="size-4 text-amber-500" />
                <span className="text-sm">{option.votes} voto(s)</span>
              </div>
            </div>
          </label>
        ))}
      </fieldset>
      <Button type="submit" disabled={isSubmitting} className="w-full md:w-1/3">
        {isSubmitting ? (
          <>
            <Spinner className="mr-2" />
            Eviando voto...
          </>
        ) : (
          'Votar'
        )}
      </Button>
    </form>
  )
}
