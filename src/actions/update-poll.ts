'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { createPollBody } from '@/schemas'

type UpdatePollBody = z.infer<typeof createPollBody> & { pollId: string }

interface UpdatePollResponse {
  error: string | null
  pollId: string | null
}

export async function updatePoll(
  data: UpdatePollBody,
): Promise<UpdatePollResponse> {
  try {
    const { userId } = auth()

    if (!userId) {
      return { error: 'Não autorizado', pollId: null }
    }

    const { title, options, pollId } = data

    await prisma.poll.update({
      where: {
        id: pollId,
        userId,
      },
      data: {
        title,
        options: {
          deleteMany: {
            pollId,
          },
          createMany: {
            data: options.map(({ title }) => {
              return { title }
            }),
          },
        },
      },
    })

    revalidatePath(`/poll/${data.pollId}`)
    revalidatePath('/polls')
    revalidatePath('/home')

    return { error: null, pollId }
  } catch (error) {
    return { error: 'Erro interno do servidor', pollId: null }
  }
}
