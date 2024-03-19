import Image from 'next/image'
import { ComponentProps } from 'react'

import { Description } from '@/components/description'
import { Title } from '@/components/title'
import { cn } from '@/lib/utils'

export function Error({ children, className, ...props }: ComponentProps<'p'>) {
  return (
    <div className="flex items-start md:px-4">
      <div
        className={cn(
          'flex-1 md:flex-none flex flex-col items-center gap-y-3',
          className,
        )}
      >
        <Image
          src="/error.svg"
          alt="Erro"
          height={100}
          width={100}
          className="aspect-square"
        />
        <div className="space-y-1 text-center">
          <Title variant="sm">Ops! Algo deu errado</Title>
          <Description {...props}>{children}</Description>
        </div>
      </div>
    </div>
  )
}
