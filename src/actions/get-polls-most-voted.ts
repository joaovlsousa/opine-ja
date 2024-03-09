import { prisma } from '@/lib/prisma'

export async function getPollsMostVoted() {
  try {
    const polls = await prisma.poll.findMany({
      take: 4,
      orderBy: [
        {
          votes: {
            _count: 'desc',
          },
        },
        { createdAt: 'desc' },
      ],
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

    return responsePayload
  } catch (error) {
    console.log({ error })
    return null
  }
}
