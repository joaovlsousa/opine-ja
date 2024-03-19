import { prisma } from '@/lib/prisma'

interface GetPollWithIdResponse {
  error: string | null
  poll: {
    options: {
      title: string
      votes: number
      id: string
    }[]
    id: string
    title: string
    userId: string
    createdAt: Date
    updatedAt: Date
    votes: number
  } | null
}

export async function getPollWithId(
  id: string,
): Promise<GetPollWithIdResponse> {
  try {
    const poll = await prisma.poll.findUnique({
      where: {
        id,
      },
      include: {
        options: {
          select: {
            title: true,
            id: true,
            _count: {
              select: {
                votes: true,
              },
            },
          },
        },
        _count: {
          select: {
            votes: true,
          },
        },
      },
    })

    if (!poll) {
      return { error: 'Enquete não encontrada', poll: null }
    }

    const { _count, options, ...pollData } = poll
    const responsePayload = {
      votes: _count.votes,
      options: options.map((option) => {
        return {
          votes: option._count.votes,
          ...option,
        }
      }),
      ...pollData,
    }

    return { error: null, poll: responsePayload }
  } catch (error) {
    return { error: 'Enquete não encontrada', poll: null }
  }
}
