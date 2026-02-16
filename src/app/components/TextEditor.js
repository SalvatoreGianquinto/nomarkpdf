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
    fattura: `FATTURA N. ____ / 2026\nData: ${new Date().toLocaleDateString()}\n\nEMITTENTE:\n[Nome Azienda/Professionista]\n[P.IVA / Codice Fiscale]\n[Indirizzo Completo]\n\nDESTINATARIO:\n[Nome Cliente]\n[P.IVA / CF]\n[Indirizzo]\n\n----------------------------------------------------------\nDESCRIZIONE PRESTAZIONE           | IMPORTO\n----------------------------------------------------------\n1. ______________________________________ | € ________\n2. ______________________________________ | € ________\n\nTOTALE IMPONIBILE: € ________\nIVA (__%):         € ________\nTOTALE FATTURA:    € ________\n\nNote: ____________________________________________________\nIBAN: ____________________________________________________`,
    preventivo: `PREVENTIVO DI SPESA\nData: ${new Date().toLocaleDateString()}\nValidità: 30 giorni\n\nCLIENTE: _________________________\nOGGETTO: _________________________\n\nDescrizione dei lavori:\n- ________________________________________________________\n- ________________________________________________________\n\nTEMPI DI CONSEGNA: ____ giorni lavorativi.\n\nTOTALE STIMATO (IVA esclusa): € _________\n\nFirma per accettazione: _________________________`,
    rapporto: `RAPPORTO DI INTERVENTO\nData: ${new Date().toLocaleDateString()}\nCliente: _________________________\n\nORE LAVORATE: ____\nDESCRIZIONE ATTIVITÀ:\n__________________________________________________________\n__________________________________________________________\n\nMATERIALI UTILIZZATI:\n1. ____________________ Q.tà ____\n2. ____________________ Q.tà ____\n\nFirma Tecnico: _________________\n\nFirma Cliente: _________________`,
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
        addAlert("Logo caricato correttamente!", "success")
      }
      reader.readAsDataURL(file)
    }
  }

  const applyTemplate = (key) => {
    if (text.trim().length > 0 && !confirm("Vuoi sostituire il testo attuale?"))
      return
    setText(templates[key])
    const dateTag = new Date().toLocaleDateString().replace(/\//g, "-")
    setFileName(`${key.toUpperCase()}_${dateTag}`)
    addAlert(`Template ${key} applicato`, "success")
  }

  const handleDownload = async () => {
    if (!text.trim()) return
    setStatus("generating")
    addAlert("Generazione PDF in corso...", "info")

    setTimeout(async () => {
      try {
        await generateTextPdf(text, fileName, logo, companyName, companyDetails)
        addAlert("PDF scaricato con successo!", "success")
      } catch (e) {
        addAlert("Errore durante la generazione", "error")
      } finally {
        setStatus("idle")
      }
    }, 600)
  }

  if (!isMounted) return null

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="fixed top-6 right-6 z-100 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md border text-white font-medium flex items-center gap-3 pointer-events-auto ${
                alert.type === "success"
                  ? "bg-emerald-500/90 border-emerald-400"
                  : "bg-slate-800/90 border-slate-700"
              }`}
            >
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
              {alert.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sezione Intestazione */}
      <div className="flex flex-col md:flex-row gap-6 p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
        <div className="relative shrink-0 mx-auto md:mx-0">
          <div className="w-24 h-24 rounded-2xl border-2 border-slate-50 overflow-hidden flex items-center justify-center bg-slate-50 relative group transition-all hover:border-blue-200">
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
              <div className="text-center relative w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <DocumentTextIcon className="w-6 h-6 text-slate-300" />
                <span className="text-[8px] font-black text-slate-400 mt-1 uppercase">
                  Logo
                </span>
                <input
                  type="file"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Ragione Sociale
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nome Azienda o Professionista"
                className="w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-500 transition-all"
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
                placeholder="P.IVA, Indirizzo, Tel..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-center md:text-left">
          Modelli Rapidi
        </h4>
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
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
              className={`flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-2xl text-xs font-black tracking-tight hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 text-slate-700`}
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
        className="space-y-4"
      >
        <div className="flex justify-between items-end px-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Contenuto Documento
          </span>
          {text && (
            <button
              onClick={() => {
                if (confirm("Svuotare l'editor?")) {
                  setText("")
                  addAlert("Editor svuotato", "info")
                }
              }}
              className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline"
            >
              Svuota
            </button>
          )}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Inizia a scrivere il tuo documento professionale..."
          className="w-full h-125 p-10 bg-white border border-slate-100 rounded-4xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all resize-none text-slate-700 leading-relaxed text-lg shadow-sm"
        />
      </motion.div>

      <div className="pt-10 flex flex-col items-center gap-6">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full max-w-sm px-6 py-4 bg-slate-50 rounded-2xl text-center font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all border border-transparent focus:border-blue-500"
        />

        <button
          onClick={handleDownload}
          disabled={status === "generating" || !text.trim()}
          className={`group relative px-16 py-5 rounded-2xl font-black text-lg transition-all
            ${
              status === "generating" || !text.trim()
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 active:scale-95"
            }`}
        >
          <div className="flex items-center gap-3">
            {status === "generating" ? (
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              <>
                <DocumentArrowDownIcon className="w-6 h-6" />
                SCARICA PDF
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
