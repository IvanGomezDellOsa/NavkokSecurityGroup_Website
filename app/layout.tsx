import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Navkok Security Group | Seguridad Privada de Élite',
  description: 'Empresa líder en seguridad privada con más de 30 años de experiencia. Servicios de vigilancia, protección ejecutiva, seguridad deportiva y monitoreo en CABA, Buenos Aires, Mendoza, Río Negro y Neuquén.',
  generator: 'v0.app',
  keywords: ['seguridad privada', 'vigilancia', 'protección ejecutiva', 'CABA', 'Mendoza', 'custodia deportiva'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
