import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

interface LogoProps {
  showName?: boolean
  className?: string
}

export function Logo({ className, showName }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('w-full flex items-center gap-x-2', className)}
    >
      <Image src="/logo.svg" height="40" width="40" alt="Logo" />
      <p
        className={cn(
          'font-semibold hidden md:block',
          showName && 'block',
          font.className,
        )}
      >
        Opine Já
      </p>
    </Link>
  )
}
