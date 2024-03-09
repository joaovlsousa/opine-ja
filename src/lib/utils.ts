import { clsx, type ClassValue } from 'clsx'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface HandleQueryStringParams {
  name: string
  value?: string
  type: 'set' | 'delete'
  searchParams: ReadonlyURLSearchParams
}

export function handleQueryString(params: HandleQueryStringParams) {
  const { name, searchParams, type, value } = params

  const queryParams = new URLSearchParams(searchParams.toString())

  if (type === 'set' && value) {
    queryParams.set(name, value)
  }

  if (type === 'delete') {
    queryParams.delete(name)
  }

  return `?${queryParams.toString()}`
}
