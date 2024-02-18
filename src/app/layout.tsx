import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Opine Já',
  description:
    'Crie suas enquetes e opine sobre as enquetes de outros usuários.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body
          className={cn(
            'antialiased bg-background/35 dark:bg-background',
            inter.className,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster richColors position="top-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
