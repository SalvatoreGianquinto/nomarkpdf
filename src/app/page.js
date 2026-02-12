"use client"

import Uploader from "./components/Uploader"

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
            100% Privato & Open Source
          </span>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
            NoMark<span className="text-blue-600">Pdf</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Converti le tue foto in PDF professionali in pochi secondi. Nessun
            server, nessuna filigrana, solo i tuoi dati.
          </p>
        </header>

        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            <Uploader />
          </div>
        </div>

        <footer className="mt-8 text-center text-slate-400 text-sm">
          Sviluppato per la produttività senza limiti da Salvatore Gianquinto.
        </footer>
      </div>
    </main>
  )
}
