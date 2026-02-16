/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { generateTextPdf } from "../lib/pdfLogic"
import {
  TrashIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
  BanknotesIcon,
  CalculatorIcon,
  ClipboardDocumentCheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"

export default function TextEditor() {
  const [text, setText] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const [fileName, setFileName] = useState("Documento_NoMark")
  const [status, setStatus] = useState("idle")
  const [logo, setLogo] = useState(null)
  const [companyName, setCompanyName] = useState("")
  const [companyDetails, setCompanyDetails] = useState("")
  const [alerts, setAlerts] = useState([])

  const addAlert = (msg, type = "info") => {
    const id = Math.random().toString(36).substr(2, 9)
    setAlerts((prev) => [...prev, { id, msg, type }])
    setTimeout(() => setAlerts((prev) => prev.filter((a) => a.id !== id)), 3000)
  }

  const templates = {
    fattura: `FATTURA N. ____ / 2026\nData: ${new Date().toLocaleDateString()}\n\nEMITTENTE:\n[Nome Azienda/Professionista]\n[P.IVA / Codice Fiscale]\n[Indirizzo Completo]\n\nDESTINATARIO:\n[Nome Cliente]\n[P.IVA / CF]\n[Indirizzo]\n\n----------------------------------------------------------\nDESCRIZIONE               | IMPORTO\n----------------------------------------------------------\n1. ______________________ | € ________\n\nTOTALE IMPONIBILE: € ________\nIVA (__%):         € ________\nTOTALE FATTURA:    € ________`,
    preventivo: `PREVENTIVO\nData: ${new Date().toLocaleDateString()}\n\nCLIENTE: _________________________\nOGGETTO: _________________________\n\nDescrizione lavori:\n- ________________________________\n\nTOTALE: € _________`,
    rapporto: `RAPPORTO INTERVENTO\nData: ${new Date().toLocaleDateString()}\nCliente: _________________________\n\nAttività svolta:\n__________________________________\n\nFirma: _________________`,
  }

  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem("nomark_text")
    const savedLogo = localStorage.getItem("nomark_logo")
    const savedName = localStorage.getItem("nomark_company")
    const savedDetails = localStorage.getItem("nomark_details")

    if (saved) setText(saved)
    if (savedLogo) setLogo(savedLogo)
    if (savedName) setCompanyName(savedName)
    if (savedDetails) setCompanyDetails(savedDetails)
  }, [])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("nomark_text", text)
      localStorage.setItem("nomark_company", companyName)
      localStorage.setItem("nomark_details", companyDetails)
      if (logo) localStorage.setItem("nomark_logo", logo)
    }
  }, [text, companyName, companyDetails, logo, isMounted])

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result)
        addAlert("Logo aggiornato!", "success")
      }
      reader.readAsDataURL(file)
    }
  }

  const applyTemplate = (key) => {
    if (text.trim().length > 0 && !confirm("Sostituire il testo attuale?"))
      return
    setText(templates[key])
    setFileName(
      `${key.toUpperCase()}_${new Date().toLocaleDateString().replace(/\//g, "-")}`,
    )
    addAlert(`Template ${key} pronto`, "success")
  }

  const handleDownload = async () => {
    if (!text.trim()) return
    setStatus("generating")
    addAlert("Generazione PDF...", "info")
    setTimeout(async () => {
      try {
        await generateTextPdf(text, fileName, logo, companyName, companyDetails)
        addAlert("PDF scaricato!", "success")
      } catch (e) {
        addAlert("Errore generazione", "error")
      } finally {
        setStatus("idle")
      }
    }, 600)
  }

  if (!isMounted) return null

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 pb-10 md:px-0">
      <div className="fixed top-4 right-4 left-4 md:left-auto z-100 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md border text-white font-bold flex items-center gap-3 pointer-events-auto ${
                alert.type === "success"
                  ? "bg-emerald-500/90 border-emerald-400"
                  : "bg-slate-800/90 border-slate-700"
              }`}
            >
              <div className="h-2 w-2 rounded-full bg-white animate-pulse shrink-0" />
              <span className="text-sm">{alert.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
        <div className="relative shrink-0 flex justify-center">
          <div className="w-24 h-24 rounded-2xl border-2 border-slate-50 overflow-hidden flex items-center justify-center bg-slate-50 relative group transition-all">
            {logo ? (
              <>
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain p-2"
                />
                <button
                  onClick={() => {
                    setLogo(null)
                    addAlert("Logo rimosso", "info")
                  }}
                  className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-slate-100 transition-colors">
                <PlusIcon className="w-6 h-6 text-blue-500" />
                <span className="text-[10px] font-black text-slate-400 mt-1 uppercase">
                  Logo
                </span>
                <input
                  type="file"
                  onChange={handleLogoUpload}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            )}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Ragione Sociale
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Nome Azienda"
              className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-base font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Dettagli Contatto
            </label>
            <input
              type="text"
              value={companyDetails}
              onChange={(e) => setCompanyDetails(e.target.value)}
              placeholder="P.IVA, Indirizzo..."
              className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-base font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
          Modelli Rapidi
        </h4>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          {[
            {
              id: "fattura",
              icon: BanknotesIcon,
              label: "FATTURA",
              color: "blue",
            },
            {
              id: "preventivo",
              icon: CalculatorIcon,
              label: "PREVENTIVO",
              color: "emerald",
            },
            {
              id: "rapporto",
              icon: ClipboardDocumentCheckIcon,
              label: "RAPPORTO",
              color: "amber",
            },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => applyTemplate(btn.id)}
              className="flex-none flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black tracking-tight shadow-sm active:scale-95 text-slate-700"
            >
              <btn.icon className={`w-4 h-4 text-${btn.color}-500`} />{" "}
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3"
      >
        <div className="flex justify-between items-end px-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Editor Documento
          </span>
          {text && (
            <button
              onClick={() => {
                if (confirm("Svuotare l'editor?")) setText("")
              }}
              className="text-red-500 text-[10px] font-black uppercase tracking-widest"
            >
              Svuota
            </button>
          )}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrivi qui il tuo documento..."
          className="w-full h-96 md:h-125 p-6 md:p-10 bg-white border border-slate-100 rounded-[2.5rem] focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all resize-none text-slate-700 leading-relaxed text-base md:text-lg shadow-sm"
          style={{ fontSize: "16px" }}
        />
      </motion.div>

      <div className="pt-6 flex flex-col items-center gap-4">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full max-w-sm bg-slate-50 px-6 py-4 rounded-2xl text-center font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border border-transparent focus:border-blue-500 text-base"
          placeholder="Nome file..."
        />

        <button
          onClick={handleDownload}
          disabled={status === "generating" || !text.trim()}
          className={`w-full md:w-auto px-16 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3
            ${
              status === "generating"
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-95"
            }`}
        >
          {status === "generating" ? (
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          ) : (
            <>
              <DocumentArrowDownIcon className="w-6 h-6" />
              GENERA PDF
            </>
          )}
        </button>
      </div>
    </div>
  )
}
