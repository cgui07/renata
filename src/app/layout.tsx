import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/components/layout"
import { Footer } from "@/components/layout"
import { FavoritesProvider } from "@/hooks/useFavorites"
import "./globals.css"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background antialiased">
        <FavoritesProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  )
}
