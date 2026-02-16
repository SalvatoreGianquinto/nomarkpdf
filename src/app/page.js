"use client"

import { useState } from "react"
import Uploader from "./components/Uploader"
import Navbar from "./components/Navbar"
import TextEditor from "./components/TextEditor"

export default function Home() {
  const [activeTab, setActiveTab] = useState("images") // Stato per cambiare tab

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="md:pl-64 pb-24 md:pb-12 pt-12 px-4 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
              100% Privato & Open Source
            </span>
            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
              NoMark<span className="text-blue-600">Pdf</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {activeTab === "images"
                ? "Converti le tue foto in PDF professionali in pochi secondi."
                : "Scrivi le tue note e trasformale in documenti PDF puliti."}
            </p>
          </header>

          <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              {activeTab === "images" ? (
                <Uploader />
              ) : (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-400 italic">
                    <TextEditor />
                  </h3>
                </div>
              )}
            </div>
          </div>

          <footer className="mt-8 text-center text-slate-400 text-sm">
            Sviluppato per la produttività senza limiti da Salvatore Gianquinto.
          </footer>
        </div>
      </main>
    </div>
  )
}
