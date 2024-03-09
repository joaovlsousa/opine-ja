import { PollCardSkeleton } from '@/components/cards/poll-card'

export function PollsSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      <PollCardSkeleton />
      <PollCardSkeleton />
      <PollCardSkeleton />
      <PollCardSkeleton />
    </div>
  )
}
