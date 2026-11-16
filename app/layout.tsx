import type { Metadata } from "next"
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import FaviconIntro from "@/components/favicon-intro"

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans" })
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

const title = "Arpan Wasti | Video Editor & Filmmaker"
const description =
  "Portfolio of Arpan Wasti (arrpanz), a video editor and filmmaker from Nepal cutting brand films, tech shorts and stories."

// Link previews (Instagram, WhatsApp, iMessage, X...) use app/opengraph-image.jpg and app/twitter-image.jpg:
// the arrpanz. wordmark over the sunset photo (made by ~/my-video/arrpanz-logo/make_og.py).
export const metadata: Metadata = {
  metadataBase: new URL("https://arpanwasti.com.np"),
  title,
  description,
  openGraph: { type: "website", url: "/", siteName: "arrpanz", title, description, locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
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
