import { auth } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

interface CreatePollResponse {
  error: string | null
  pollId: string | null
}

export async function deletePoll(pollId: string): Promise<CreatePollResponse> {
  try {
    const { userId } = auth()

    if (!userId) {
      return { error: 'Não autorizado', pollId: null }
    }

    const poll = await prisma.poll.delete({
      where: {
        id: pollId,
        userId,
      },
    })

    return { error: null, pollId: poll.id }
  } catch (error) {
    console.log(error)
    return { error: 'Erro interno do servidor', pollId: null }
  }
}
