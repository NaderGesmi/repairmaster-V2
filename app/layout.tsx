import type React from "react"
import "@/app/globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Toaster } from "@/components/toaster"
import { StickyContact } from "@/components/sticky-contact"

export const metadata = {
  title: "RepairMaster - Professional Repair Services",
  description: "Fast, reliable repairs for your home & office electronics and air conditioning in Bucharest.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
              <Toaster />
              <StickyContact />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
