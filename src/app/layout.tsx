import "./globals.css"

import type { Metadata } from "next"
import { headers } from "next/headers"
import { Header } from "@/components/layout"
import { Footer } from "@/components/layout"
import { Geist, Geist_Mono } from "next/font/google"
import { FavoritesProvider } from "@/hooks/useFavorites"
import { WhatsAppFab } from "@/components/common/WhatsAppFab"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Renata Imóveis",
    template: "%s | Renata Imóveis",
  },
  description: "Encontre o imóvel dos seus sonhos com a Renata Imóveis.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const requestHeaders = await headers()
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "").toLowerCase()
  const hostname = host.split(":")[0]
  const isAdminHost = hostname.startsWith("admin.")
  const isAdminArea = requestHeaders.get("x-admin-area") === "1" || isAdminHost

  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background antialiased">
        <FavoritesProvider>
          {!isAdminArea && <Header />}
          <main className="flex-1">{children}</main>
          {!isAdminArea && <Footer />}
          {!isAdminArea && <WhatsAppFab />}
        </FavoritesProvider>
      </body>
    </html>
  )
}
