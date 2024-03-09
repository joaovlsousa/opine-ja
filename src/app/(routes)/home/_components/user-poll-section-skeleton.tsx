import { PollCardSkeleton } from '@/components/cards/poll-card'
import { Skeleton } from '@/components/ui/skeleton'

export function UserPollSectionSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="w-full h-full p-6 rounded-md space-y-2">
        <Skeleton className="mx-auto size-28 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="w-full h-3.5" />
          <Skeleton className="w-full h-2.5" />
          <Skeleton className="w-1/2 h-2.5" />
        </div>
      </div>

      <PollCardSkeleton />
    </div>
  )
}
