import type { Metadata } from "next"
import { Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Arpan Wasti | Video Editor & Filmmaker",
  description:
    "Portfolio of Arpan Wasti (arrpanz), a video editor and filmmaker from Nepal cutting brand films, tech shorts and stories.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
