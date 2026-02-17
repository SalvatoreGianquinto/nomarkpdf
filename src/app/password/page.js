"use client"

import {
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"

export default function PasswordPage() {
  const runGeneration = (len, opts) => {
    const charSets = {
      maiuscole: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      minuscole: "abcdefghijklmnopqrstuvwxyz",
      numeri: "0123456789",
      simboli: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    }

    let chars = ""
    if (opts.maiuscole) chars += charSets.maiuscole
    if (opts.minuscole) chars += charSets.minuscole
    if (opts.numeri) chars += charSets.numeri
    if (opts.simboli) chars += charSets.simboli

    if (!chars) return "Seleziona opzioni"

    const array = new Uint32Array(len)
    window.crypto.getRandomValues(array)
    return Array.from(array)
      .map((x) => chars.charAt(x % chars.length))
      .join("")
  }

  const [length, setLength] = useState(24)
  const [options, setOptions] = useState({
    maiuscole: true,
    minuscole: true,
    numeri: true,
    simboli: true,
  })

  const [password, setPassword] = useState(() =>
    runGeneration(24, {
      maiuscole: true,
      minuscole: true,
      numeri: true,
      simboli: true,
    }),
  )
  const [copied, setCopied] = useState(false)

  const handleManualGenerate = () => {
    setPassword(runGeneration(length, options))
  }

  const handleLengthChange = (newVal) => {
    setLength(newVal)
    setPassword(runGeneration(newVal, options))
  }

  const handleOptionToggle = (key) => {
    const newOptions = { ...options, [key]: !options[key] }
    setOptions(newOptions)
    setPassword(runGeneration(length, newOptions))
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    const activeOptions = Object.values(options).filter(Boolean).length
    if (length < 12 || activeOptions < 2)
      return { label: "Debole", color: "bg-red-400" }
    if (length < 18 || activeOptions < 3)
      return { label: "Buona", color: "bg-blue-400" }
    return { label: "Massima", color: "bg-emerald-500" }
  }

  const strength = getStrength()
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors group mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Torna al Lab
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              NoMark<span className="text-emerald-500">Pass</span>
            </h1>
          </div>
        </header>

        <main className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-16 shadow-sm relative overflow-hidden group">
            <div className="relative z-10 flex flex-col items-center gap-10 text-center">
              <div className="w-full">
                <div className="text-3xl md:text-5xl font-mono font-medium text-slate-800 break-all tracking-tight mb-4 select-all leading-tight">
                  {password}
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span
                    className={`w-2 h-2 rounded-full ${strength.color} animate-pulse`}
                  />
                  Sicurezza: {strength.label}
                </div>
              </div>

              <div className="flex gap-4 w-full max-w-md">
                <button
                  onClick={handleManualGenerate}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-bold border border-slate-100"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                  <span>Nuova</span>
                </button>
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                    copied
                      ? "bg-emerald-500 text-white shadow-emerald-100"
                      : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200"
                  }`}
                >
                  {copied ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <ClipboardDocumentIcon className="w-5 h-5" />
                  )}
                  {copied ? "Copiata!" : "Copia"}
                </button>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Lunghezza
                </h3>
                <span className="text-xl font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                  {length}
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => handleLengthChange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 grid grid-cols-2 gap-3">
              {Object.keys(options).map((key) => (
                <button
                  key={key}
                  onClick={() => handleOptionToggle(key)}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                    options[key]
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-50 bg-slate-50 text-slate-300"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </main>

        <footer className="mt-16 text-center border-t border-slate-200 pt-8">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
            NoMarkPass — 100% Client-Side Privacy
          </p>
        </footer>
      </div>
    </div>
  )
}
