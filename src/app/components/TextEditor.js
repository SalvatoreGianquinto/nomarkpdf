"use client"
import { useState, useEffect } from "react"
import { generateTextPdf } from "../lib/pdfLogic"
import {
  TrashIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

export default function TextEditor() {
  const [text, setText] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const [fileName, setFileName] = useState("Documento_NoMark")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem("nomark_text")
    if (saved) setText(saved)
  }, [])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("nomark_text", text)
    }
  }, [text, isMounted])

  const handleDownload = async () => {
    if (!text.trim()) return
    setIsGenerating(true)
    setTimeout(async () => {
      try {
        await generateTextPdf(text, fileName)
      } catch (e) {
        console.error(e)
      } finally {
        setIsGenerating(false)
      }
    }, 600)
  }

  if (!isMounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold uppercase tracking-wider text-xs text-slate-800">
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
          className="w-full h-112.5 p-8 bg-slate-50 border border-slate-200 rounded-4xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-slate-800 leading-relaxed text-base shadow-inner"
        />
      </div>

      <div className="pt-6 border-t border-slate-100 flex flex-col items-center space-y-4">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full max-w-xs px-4 py-2 bg-transparent text-center font-bold text-slate-700 outline-none border-b-2 border-transparent focus:border-blue-500 transition-all"
          placeholder="Nome file"
        />

        <button
          onClick={handleDownload}
          disabled={isGenerating || !text.trim()}
          className={`w-full md:w-auto font-black py-4 px-12 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3
            ${isGenerating || !text.trim() ? "bg-slate-200 text-slate-400" : "bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1"}`}
        >
          {isGenerating ? "GENERAZIONE..." : "SCARICA PDF"}
        </button>
      </div>
    </div>
  )
}
