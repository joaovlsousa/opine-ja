import { AlertCircle } from 'lucide-react'
import { ComponentProps } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

export function Error({ children, className }: ComponentProps<'p'>) {
  return (
    <Alert variant="destructive" className={cn(className)}>
      <AlertCircle className="size-4" />
      <AlertTitle className="font-semibold">Erro</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
