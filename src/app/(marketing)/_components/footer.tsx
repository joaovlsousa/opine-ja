import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
      <Logo className="hidden md:flex" />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Política de privacidade
        </Button>
        <Button variant="ghost" size="sm">
          Termos e Condições
        </Button>
      </div>
    </div>
  )
}
