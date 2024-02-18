import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { createPollBody } from '@/schemas'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const body = await req.json()
    const payload = createPollBody.safeParse(body)

    if (!payload.success) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 400 },
      )
    }

    const { title, options } = payload.data

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

    return NextResponse.json({ pollId: poll.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
