/* eslint-disable @next/next/no-img-element */
"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { generateImagePdf } from "../lib/pdfLogic"
import LoadingDots from "./LoadingDots"

export default function Uploader() {
  const [images, setImages] = useState([])
  const [fileName, setFileName] = useState("NoMarkScan")
  const [isGenerating, setIsGenerating] = useState(false) // STATO PER IL LOADER

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    )
    setImages((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  })

  const handleGeneratePdf = async () => {
    if (images.length === 0) return

    setIsGenerating(true)

    setTimeout(async () => {
      try {
        await generateImagePdf(images, fileName)
      } catch (error) {
        console.error(error)
      } finally {
        setIsGenerating(false)
      }
    }, 100)
  }
  return (
    <div className="space-y-8">
      <div
        {...getRootProps()}
        className={`relative group border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50/50 scale-[1.01]"
              : "border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-white"
          }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <p className="text-xl font-semibold text-slate-700">
            {isDragActive ? "Rilascia le foto qui" : "Aggiungi le tue immagini"}
          </p>
          <p className="text-slate-500 mt-2">
            Trascina i file o clicca per sfogliare
          </p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">
              Immagini caricate ({images.length})
            </h3>
            <button
              onClick={() => setImages([])}
              className="text-red-500 text-xs font-semibold hover:underline"
            >
              Rimuovi tutte
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((file, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden aspect-square shadow-sm border border-slate-200"
              >
                <img
                  src={file.preview}
                  alt="preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setImages(images.filter((_, i) => i !== index))
                  }}
                  className="absolute top-2 right-2 bg-white/90 text-red-600 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {images.length > 0 && (
            <div className="flex flex-col items-center space-y-6 pt-10 border-t border-slate-100">
              <div className="w-full max-w-sm">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                  Nome del file PDF
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Inserisci nome..."
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-800"
                />
              </div>

              {/* PULSANTE MODIFICATO */}
              <button
                onClick={handleGeneratePdf}
                disabled={isGenerating || images.length === 0}
                className={`w-full md:w-auto font-bold py-4 px-16 rounded-2xl shadow-xl transition-all flex items-center justify-center min-w-60 h-15
                  ${
                    isGenerating
                      ? "bg-blue-800 cursor-not-allowed shadow-none"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100 hover:-translate-y-1 active:scale-95"
                  }`}
              >
                {isGenerating ? <LoadingDots /> : "Genera e Scarica PDF"}
              </button>

              <p className="text-slate-400 text-xs italic">
                Il file verrà salvato come: {fileName || "NoMarkScan"}.pdf
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
