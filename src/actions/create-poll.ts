import { auth } from '@clerk/nextjs'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { createPollBody } from '@/schemas'

type CreatePollBody = z.infer<typeof createPollBody>

interface CreatePollResponse {
  error: string | null
  pollId: string | null
}

export async function createPoll(
  data: CreatePollBody,
): Promise<CreatePollResponse> {
  try {
    const { userId } = auth()

    if (!userId) {
      return { error: 'Não autorizado', pollId: null }
    }

    const { title, options } = data

    const poll = await prisma.poll.create({
      data: {
        title,
        userId,
        options: {
          createMany: {
            data: options.map(({ title }) => {
              return { title }
            }),
          },
        },
      },
    })

    return { error: null, pollId: poll.id }
  } catch (error) {
    return { error: 'Erro interno do servidor', pollId: null }
  }
}
