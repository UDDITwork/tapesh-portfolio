import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'Tapesh — Drone Technologist',
  description: 'Tapesh — Drone researcher, engineering student at BIET Jhansi, Coordinator at The Drone Learner\'s Club.',
  openGraph: {
    title: 'Tapesh — Drone Technologist',
    description: 'Tapesh — Drone researcher, engineering student at BIET Jhansi, Coordinator at The Drone Learner\'s Club.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="%23A8D8EA" stroke-width="2"/><line x1="10" y1="50" x2="90" y2="50" stroke="%23A8D8EA" stroke-width="1"/><line x1="50" y1="10" x2="50" y2="90" stroke="%23A8D8EA" stroke-width="1"/><circle cx="50" cy="50" r="4" fill="%23A8D8EA"/></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
