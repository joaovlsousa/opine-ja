import { z } from 'zod'

export const createPollBody = z.object({
  title: z
    .string({ required_error: 'Informe um título' })
    .min(1, 'Informe um título'),
  options: z
    .array(
      z.object({
        title: z
          .string({ required_error: 'Informe um título' })
          .min(1, 'Informe um título'),
      }),
    )
    .min(2, 'Informe pelo menos 2 opções'),
})

export const searchPoll = z.object({
  search: z.string().optional(),
})

export const voteOnPoll = z.object({
  pollOptionId: z.string(),
})
