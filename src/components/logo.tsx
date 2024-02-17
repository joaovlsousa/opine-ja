import { Poppins } from 'next/font/google'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

interface LogoProps extends ComponentProps<'div'> {}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <div
      className={cn('w-full flex items-center gap-x-2', className)}
      {...props}
    >
      <Image src="/logo.svg" height="40" width="40" alt="Logo" />
      <p className={cn('font-semibold hidden md:block', font.className)}>
        Opine Já
      </p>
    </div>
  )
}
