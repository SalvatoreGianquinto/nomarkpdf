import { NextResponse } from "next/server"

const MAINTENANCE_MODE = true

export function middleware(request) {
  if (MAINTENANCE_MODE) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="it">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>NoMark Lab — Torniamo presto</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6 font-sans">
          <div class="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-10 max-w-md w-full text-center">
            <span class="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
              Laboratorio in Aggiornamento
            </span>

            <div class="w-14 h-14 mx-auto mb-6 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 text-2xl">
              🔧
            </div>

            <h1 class="text-2xl font-bold tracking-tight text-slate-900 mb-3">
              NoMark<span class="text-blue-600">Lab</span> torna a breve
            </h1>

            <p class="text-slate-500 text-sm leading-relaxed mb-8">
              Stiamo migliorando i nostri strumenti privacy-first. Nessun dato, nessuna impronta — solo qualche minuto di pazienza.
            </p>

            <footer class="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] border-t border-slate-200 pt-6">
              Zero Log · Sempre
            </footer>
          </div>
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
