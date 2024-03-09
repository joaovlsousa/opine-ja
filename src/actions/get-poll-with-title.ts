import { prisma } from '@/lib/prisma'

interface GetPollWithTitleResponse {
  error: string | null
  polls:
    | {
        options: {
          title: string
        }[]
        id: string
        title: string
        userId: string
        createdAt: Date
        updatedAt: Date
        votes: number
      }[]
    | null
}

export async function getPollsWithTitle(
  title: string,
): Promise<GetPollWithTitleResponse> {
  try {
    const polls = await prisma.poll.findMany({
      where: {
        title: {
          contains: title.toLowerCase(),
          mode: 'insensitive',
        },
      },
      include: {
        options: {
          select: {
            title: true,
          },
        },
        _count: {
          select: {
            votes: true,
          },
        },
      },
    })

    if (!polls || !polls.length) {
      return { error: 'Enquete não encontrada', polls: null }
    }

    const responsePayload = polls.map(({ _count, ...poll }) => {
      return {
        votes: _count.votes,
        ...poll,
      }
    })

    return { error: null, polls: responsePayload }
  } catch (error) {
    return { error: 'Enquete não encontrada', polls: null }
  }
}
