import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
    <html lang="pt-BR">
      <body className={cn('antialiased bg-background/30', inter.className)}>
        {children}
      </body>
    </html>
  )
}
