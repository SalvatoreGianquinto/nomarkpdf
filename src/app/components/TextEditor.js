/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect } from "react"
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
  const [isGenerating, setIsGenerating] = useState(false)
  const [logo, setLogo] = useState(null)

  // --- NUOVI STATI PER INTESTAZIONE ---
  const [companyName, setCompanyName] = useState("")
  const [companyDetails, setCompanyDetails] = useState("")

  const templates = {
    fattura: `FATTURA N. ____ / 2026\nData: ${new Date().toLocaleDateString()}\n\nEMITTENTE:\n[Nome Azienda/Professionista]\n[P.IVA / Codice Fiscale]\n[Indirizzo Completo]\n\nDESTINATARIO:\n[Nome Cliente]\n[P.IVA / CF]\n[Indirizzo]\n\n----------------------------------------------------------\nDESCRIZIONE PRESTAZIONE                   | IMPORTO\n----------------------------------------------------------\n1. ______________________________________ | € ________\n2. ______________________________________ | € ________\n\nTOTALE IMPONIBILE: € ________\nIVA (__%):         € ________\nTOTALE FATTURA:    € ________\n\nNote: ____________________________________________________\nIBAN: ____________________________________________________`,
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
      reader.onloadend = () => setLogo(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogo(null)
    localStorage.removeItem("nomark_logo")
  }

  const applyTemplate = (key) => {
    if (text.trim().length > 0 && !confirm("Vuoi sostituire il testo attuale?"))
      return
    setText(templates[key])
    const dateTag = new Date().toLocaleDateString().replace(/\//g, "-")
    setFileName(`${key.toUpperCase()}_${dateTag}`)
  }

  const handleDownload = async () => {
    if (!text.trim()) return
    setIsGenerating(true)
    setTimeout(async () => {
      try {
        await generateTextPdf(text, fileName, logo, companyName, companyDetails)
      } catch (e) {
        console.error(e)
      } finally {
        setIsGenerating(false)
      }
    }, 600)
  }

  if (!isMounted) return null

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 border border-slate-200 rounded-4xl mb-8">
        <div className="relative shrink-0 mx-auto md:mx-0">
          <div className="w-24 h-24 rounded-2xl border-2 border-white shadow-sm overflow-hidden flex items-center justify-center bg-white relative">
            {logo ? (
              <>
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain p-2"
                />
                <button
                  onClick={removeLogo}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors border-2 border-white"
                >
                  <TrashIcon className="w-3 h-3" />
                </button>
              </>
            ) : (
              <div className="text-center relative w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <DocumentTextIcon className="w-8 h-8 text-slate-300 mx-auto" />
                <span className="text-[8px] font-black text-slate-400 italic">
                  CARICA LOGO
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
          <div>
            <label className="text-[10px] font-black italic text-slate-400 uppercase tracking-widest ml-1">
              Ragione Sociale
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Nome Azienda o Professionista"
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] font-black italic text-slate-400 uppercase tracking-widest ml-1">
              Sede e Contatti (Via, P.IVA, Tel)
            </label>
            <textarea
              value={companyDetails}
              onChange={(e) => setCompanyDetails(e.target.value)}
              placeholder="Via Roma 1, Milano - P.IVA 0123456789"
              className="w-full h-16 p-4 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/10 resize-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 italic uppercase tracking-[0.2em] ml-1">
          Modelli Professionali
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyTemplate("fattura")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-xs font-bold italic text-blue-700 hover:bg-blue-100 transition-all shadow-sm active:scale-95"
          >
            <BanknotesIcon className="w-4 h-4" /> FATTURA
          </button>
          <button
            onClick={() => applyTemplate("preventivo")}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold italic text-emerald-700 hover:bg-emerald-100 transition-all shadow-sm active:scale-95"
          >
            <CalculatorIcon className="w-4 h-4" /> PREVENTIVO
          </button>
          <button
            onClick={() => applyTemplate("rapporto")}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl text-xs font-bold italic text-amber-700 hover:bg-amber-100 transition-all shadow-sm active:scale-95"
          >
            <ClipboardDocumentCheckIcon className="w-4 h-4" /> RAPPORTO
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold italic uppercase tracking-wider text-xs text-slate-800">
              Editor
            </h3>
          </div>
          {text && (
            <button
              onClick={() => confirm("Svuotare?") && setText("")}
              className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline"
            >
              Cancella tutto
            </button>
          )}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrivi qui il tuo documento..."
          className="w-full h-96 p-8 bg-slate-50 border border-slate-200 rounded-4xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-slate-800 leading-relaxed text-base shadow-inner"
        />
      </div>

      <div className="pt-6 border-t border-slate-100 flex flex-col items-center space-y-4">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full max-w-xs px-4 py-2 bg-transparent text-center font-bold text-slate-700 outline-none border-b-2 border-transparent focus:border-blue-500 transition-all"
        />
        <button
          onClick={handleDownload}
          disabled={isGenerating || !text.trim()}
          className={`w-full md:w-auto font-black py-4 px-12 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 ${
            isGenerating || !text.trim()
              ? "bg-slate-200 text-slate-400"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1"
          }`}
        >
          {isGenerating ? "GENERAZIONE..." : "SCARICA PDF"}
        </button>
      </div>
    </div>
  )
}
