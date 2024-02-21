import { auth } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

export async function getUserPolls() {
  try {
    const { userId } = auth()

    if (!userId) {
      return null
    }

    const polls = await prisma.poll.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
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
    console.log(error)
    return null
  }
}
