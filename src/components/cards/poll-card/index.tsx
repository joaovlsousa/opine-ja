import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { BadgeCheck, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Description } from '@/components/description'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PollCardHeaderActions } from './header-actions'

interface PollCardProps {
  pollId: string
  isSelfUser: boolean
  title: string
  createdAt: string | Date
  options: {
    title: string
  }[]
  votes: number
}

export function PollCard({
  pollId,
  isSelfUser,
  title,
  createdAt,
  options,
  votes,
}: PollCardProps) {
  const distanceToNow = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ptBR,
  })

  const morePollOptions = options.length - 2

  return (
    <Card className="flex flex-col">
      <CardHeader className="relative">
        <CardTitle className="mr-10">{title}</CardTitle>
        <PollCardHeaderActions pollId={pollId} isSelfUser={isSelfUser} />
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        {options.slice(0, 2).map(({ title }) => (
          <div key={title} className="flex items-center gap-x-2">
            <div className="size-1.5 rounded-full bg-foreground" />
            <span className="text-sm">{title}</span>
          </div>
        ))}
        {morePollOptions > 0 && (
          <div className="-mt-1 ml-3.5">
            <Description className="italic font-medium text-xs">
              {morePollOptions === 1
                ? `mais ${morePollOptions} opção`
                : `mais ${morePollOptions} opções`}
            </Description>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col md:flex-row gap-y-2 md:gap-y-0 items-start md:items-center md:justify-between">
        <div className="flex items-center gap-x-1 ml-1 md:ml-0">
          <BadgeCheck className="size-4 text-sky-500" />
          <span className="text-sm">
            {votes} voto(s), {distanceToNow}
          </span>
        </div>
        <Button asChild variant="ghost">
          <Link href={`/polls/${pollId}`}>
            Ver detalhes
            <ChevronRight className="size-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function PollCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center gap-x-12">
        <Skeleton className="w-full h-4 rounded-full" />
        <Skeleton className="size-5 rounded-full" />
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <Skeleton className="w-1/2 h-3.5 rounded-full" />
        <Skeleton className="w-1/2 h-3.5 rounded-full" />
        <Skeleton className="w-1/3 h-3 rounded-full" />
      </CardContent>
      <CardFooter className="flex-col md:flex-row gap-y-2 md:gap-y-0 items-start md:items-center md:justify-between">
        <Skeleton className="w-1/2 h-3.5 rounded-full" />
        <Skeleton className="w-1/3 h-3.5 rounded-full" />
      </CardFooter>
    </Card>
  )
}
