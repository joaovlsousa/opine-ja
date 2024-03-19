'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updatePoll } from '@/actions/update-poll'
import { Error } from '@/components/error'
import { Spinner } from '@/components/spinner'
import { Title } from '@/components/title'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { createPollBody } from '@/schemas'

type UpdatePollBody = z.infer<typeof createPollBody>

export function EditPollForm({ options, title }: UpdatePollBody) {
  const router = useRouter()
  const params = useParams()

  const form = useForm<UpdatePollBody>({
    resolver: zodResolver(createPollBody),
    mode: 'all',
    defaultValues: {
      title,
      options,
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'options',
  })

  function appendOption() {
    append({ title: '' })
  }

  function removeOption(index: number) {
    remove(index)
  }

  async function onSubmit(data: UpdatePollBody) {
    const { error, pollId } = await updatePoll({
      options: data.options,
      title: data.title,
      pollId: params.pollId as string,
    })

    if (error) {
      toast.error(error)
    }

    if (pollId) {
      toast.success('Enquete atualizada com sucesso')

      router.push(`/polls/${pollId}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Título da enquete</FormLabel>
              <Textarea
                id="title"
                className="resize-none h-20"
                disabled={isSubmitting}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-x-3">
          <Title variant="sub">Opções</Title>

          <AlertCircle className="-mr-2 size-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Mínimo de 2 opções
          </span>

          <Button
            onClick={appendOption}
            size="sm"
            variant="ghost"
            className="ml-auto text-emerald-500 hover:text-emerald-500"
          >
            Adicionar opção
          </Button>
        </div>

        {fields.map((item, index) => (
          <div key={item.id} className="flex items-start gap-x-4">
            <FormField
              control={control}
              name={`options.${index}.title`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input disabled={isSubmitting} {...field} />
                  <FormMessage>
                    {errors.options !== undefined &&
                      errors.options?.[index]?.title?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              onClick={() => removeOption(index)}
              size="icon"
              variant="destructive"
            >
              <Trash className="size-4" />
            </Button>
          </div>
        ))}

        <Error
          className={cn(
            'hidden',
            errors.options !== undefined && errors.options.message && 'block',
          )}
        >
          {errors.options !== undefined && errors.options.message}
        </Error>

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && (
            <>
              <Spinner className="mr-2" />
              <p>Atualizando a enquete....</p>
            </>
          )}
          {!isSubmitting && <p>Atualizar enquete</p>}
        </Button>
      </form>
    </Form>
  )
}
