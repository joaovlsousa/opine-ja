import { Spinner } from '@/components/spinner'

export default function PollIdLoading() {
  return (
    <div className="w-full h-[calc(100vh-8rem)] flex items-center justify-center">
      <Spinner />
    </div>
  )
}
