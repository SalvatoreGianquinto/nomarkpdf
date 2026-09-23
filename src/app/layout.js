import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  metadataBase: new URL("https://nomarklab.app"),

  title: "NoMarkLAB",
  description:
    "NoMarkLAB: strumenti web semplici, veloci e focalizzati sulla privacy.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "NoMarkLAB",
    description:
      "NoMarkLAB: strumenti web semplici, veloci e focalizzati sulla privacy.",
    url: "https://nomarklab.app",
    siteName: "NoMarkLAB",
    locale: "it_IT",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
}
