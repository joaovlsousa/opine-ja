import { prisma } from '@/lib/prisma'

export async function getUserPollMostVoted() {
  try {
    const polls = await prisma.poll.findMany({
      take: 1,
      orderBy: {
        votes: {
          _count: 'desc',
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

    const responsePayload = polls.map(({ _count, ...poll }) => {
      return {
        votes: _count.votes,
        ...poll,
      }
    })

    return responsePayload[0]
  } catch (error) {
    return null
  }
}
