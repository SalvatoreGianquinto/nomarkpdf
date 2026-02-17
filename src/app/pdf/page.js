"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Uploader from "../components/Uploader"
import TextEditor from "../components/TextEditor"
import Link from "next/link"
import { ArrowLeftIcon, SparklesIcon } from "@heroicons/react/24/outline"

export default function Home() {
  const [activeTab, setActiveTab] = useState("images")

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="md:pl-64 pb-24 md:pb-12 pt-8 px-6 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors group mb-6"
            >
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Torna al Lab
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                NoMark<span className="text-blue-600">PDF</span>
              </h1>
            </div>
          </nav>

          <header className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
              100% Privato
            </span>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {activeTab === "images"
                ? "Converti le tue foto in PDF professionali in pochi secondi."
                : "Scrivi le tue note e trasformale in documenti PDF puliti."}
            </p>
          </header>

          <div className="bg-white shadow-xl shadow-slate-200/50 rounded-[2.5rem] border border-slate-200 overflow-hidden">
            <div className="p-8">
              {activeTab === "images" ? (
                <Uploader />
              ) : (
                <div className="text-center">
                  <TextEditor />
                </div>
              )}
            </div>
          </div>
          <footer className="mt-16 text-center border-t border-slate-200 pt-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
              NoMarkPDF — Local Processing, No Data Tracking
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
