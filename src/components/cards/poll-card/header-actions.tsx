'use client'

import { Edit, MoreHorizontal, Share2, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deletePoll } from '@/actions/delete-poll'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface PollCardHeaderActionsProps {
  isSelfUser: boolean
  pollId: string
}

export function PollCardHeaderActions({
  isSelfUser,
  pollId,
}: PollCardHeaderActionsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleDeletePoll() {
    startTransition(async () => {
      const { error, pollId: pollResponseId } = await deletePoll(pollId)

      if (error) {
        toast.error(error)
      }

      if (pollResponseId) {
        toast.success('Enquete excluída com sucesso')

        router.refresh()
      }
    })
  }

  async function sharePoll() {
    const linkToShare = `${process.env.NEXT_PUBLIC_APP_URL}/polls/${pollId}`

    await navigator.clipboard.writeText(linkToShare)

    toast.success('O link foi copiado para a sua área de transferência')
  }

  const actions = [
    {
      label: 'Compartilhar link',
      icon: Share2,
      onClick: sharePoll,
      disabled: isPending,
    },
    {
      label: 'Editar enquete',
      icon: Edit,
      onClick: () => router.push(`/polls/${pollId}/edit`),
      disabled: isPending,
    },
    {
      label: isPending ? 'Excluindo enquete...' : 'Excluir enquete',
      icon: isPending ? Spinner : Trash,
      onClick: handleDeletePoll,
      disabled: isPending,
    },
  ]

  if (!isSelfUser) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={sharePoll}
        className="absolute top-2.5 right-6"
      >
        <Share2 className="size-4" />
      </Button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2.5 right-6"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-auto flex flex-col items-start gap-y-2 py-2 px-1 border-0 bg-secondary"
      >
        {actions.map(({ icon: Icon, label, onClick, disabled }) => (
          <Button
            key={label}
            variant="ghost"
            onClick={onClick}
            disabled={disabled}
          >
            <Icon className="size-4 mr-2" />
            <span>{label}</span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
