import type { Metadata } from "next"
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import FaviconIntro from "@/components/favicon-intro"

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans" })
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Arpan Wasti | Video Editor & Filmmaker",
  description:
    "Portfolio of Arpan Wasti (arrpanz), a video editor and filmmaker from Nepal cutting brand films, tech shorts and stories.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        {children}
        <FaviconIntro />
      </body>
    </html>
  )
}
