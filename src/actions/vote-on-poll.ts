'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'

interface VoteOnPollParams {
  pollOptionId: string
  pollId: string
}

export async function voteOnPoll(data: VoteOnPollParams) {
  try {
    const { userId } = auth()

    if (!userId) {
      return { error: 'Não autorizado', success: null }
    }

    const userPreviousVoteOnPoll = await prisma.vote.findUnique({
      where: {
        userId_pollId: {
          pollId: data.pollId,
          userId,
        },
      },
    })

    if (
      userPreviousVoteOnPoll &&
      userPreviousVoteOnPoll.pollOptionId !== data.pollOptionId
    ) {
      await prisma.vote.delete({
        where: {
          id: userPreviousVoteOnPoll.id,
        },
      })
    } else if (userPreviousVoteOnPoll) {
      return { error: 'Você já votou nesta opção', success: null }
    }

    await prisma.vote.create({
      data: {
        userId,
        pollId: data.pollId,
        pollOptionId: data.pollOptionId,
      },
    })

    if (userPreviousVoteOnPoll?.userId === userId) {
      revalidatePath('/polls')
    }

    revalidatePath(`/poll/${data.pollId}`)
    revalidatePath('/home')

    return { error: null, success: 'Sucesso' }
  } catch (error) {
    return { error: 'Erro interno do servidor', success: null }
  }
}
