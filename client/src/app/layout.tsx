"use client";

import "./globals.css"
import {ClerkProvider} from "@clerk/nextjs"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { StateProvider } from '../components/context/StateContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <ClerkProvider>
      <html lang="en">
        <QueryClientProvider client={queryClient}>
          <body>
            <StateProvider>
              {children}
            </StateProvider>
          </body>
        </QueryClientProvider>
      </html>
    </ClerkProvider>
  )
}