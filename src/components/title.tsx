import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const titleVariants = cva('font-bold', {
  variants: {
    variant: {
      default: 'text-2xl',
      sm: 'text-xl',
      sub: 'text-lg font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {}

export function Title({ className, variant, children, ...props }: TitleProps) {
  return (
    <h1 className={cn(titleVariants({ variant, className }))} {...props}>
      {children}
    </h1>
  )
}
