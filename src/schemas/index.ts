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
