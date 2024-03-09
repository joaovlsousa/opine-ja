'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn, handleQueryString } from '@/lib/utils'
import { searchPoll } from '@/schemas'
import { useEffect } from 'react'

type SearchPoll = z.infer<typeof searchPoll>
interface SearchPollProps {
  isMobile?: boolean
}

export function SearchPoll({ isMobile = false }: SearchPollProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useForm<SearchPoll>({
    resolver: zodResolver(searchPoll),
    mode: 'all',
  })

  const hasQueryString = watch('search')

  useEffect(() => {
    const query = searchParams.get('search')

    if (query) {
      setValue('search', query)
    }
  }, [searchParams, setValue])

  function onSubmit(data: SearchPoll) {
    let params: string = ''

    if (data.search) {
      params = handleQueryString({
        name: 'search',
        value: data.search,
        type: 'set',
        searchParams,
      })
    } else {
      params = handleQueryString({
        name: 'search',
        type: 'delete',
        searchParams,
      })
    }

    router.push(pathname + params)
  }

  function clearQueryString() {
    setValue('search', undefined)

    onSubmit({ search: undefined })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'w-full md:w-[20rem] lg:w-[32rem] items-center px-4',
        pathname === '/home' && !isMobile ? 'hidden md:flex' : 'hidden',
        isMobile ? 'flex md:hidden px-0' : 'hidden',
      )}
    >
      <Button
        onClick={clearQueryString}
        disabled={isSubmitting}
        type="button"
        size="icon"
        variant="secondary"
        className={cn(
          'mr-4 rounded-full hidden',
          hasQueryString && 'inline-flex',
        )}
      >
        <X className="size-4" />
      </Button>
      <Input
        {...register('search')}
        placeholder="Procurar..."
        disabled={isSubmitting}
        className="flex-1 rounded-r-none focus-visible:ring-0"
      />
      <Button
        type="submit"
        variant="secondary"
        disabled={isSubmitting}
        className="rounded-l-none"
      >
        <Search className="size-4" />
      </Button>
    </form>
  )
}
