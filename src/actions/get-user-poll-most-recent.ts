'use server'

import { auth } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

export async function getUserPollMostRecent() {
  try {
    const { userId } = auth()

    if (!userId) {
      return null
    }

    const polls = await prisma.poll.findMany({
      where: {
        userId,
      },
      take: 1,
      orderBy: {
        createdAt: 'desc',
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
