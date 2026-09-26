import { NextResponse } from "next/server"

const MAINTENANCE_MODE = true

export function middleware(request) {
  if (MAINTENANCE_MODE) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="it">
        <head><meta charset="utf-8"><title>NoMark Lab — Torniamo presto</title></head>
        <body style="font-family: sans-serif; text-align: center; padding-top: 15%;">
          <h1>🔧 Stiamo migliorando NoMark Lab</h1>
          <p>Torniamo online a breve. Grazie per la pazienza.</p>
        </body>
      </html>`,
      {
        status: 503,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Retry-After": "86400",
        },
      },
    )
  }
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
}
