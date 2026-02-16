"use client"

import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import {
  DocumentArrowDownIcon,
  TrashIcon,
  ArrowPathIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"

import { generateImagePdf } from "../lib/pdfLogic"
import LoadingDots from "./LoadingDots"
import SortableImage from "./SortableImage"

const compressImage = async (file) => {
  const img = new Image()
  const reader = new FileReader()

  return new Promise((resolve) => {
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      img.src = e.target.result
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const maxWidth = 1500
        const scale = Math.min(1, maxWidth / img.width)
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => {
            resolve(
              Object.assign(
                new File([blob], file.name, { type: "image/jpeg" }),
                {
                  preview: URL.createObjectURL(blob),
                },
              ),
            )
          },
          "image/jpeg",
          0.75,
        )
      }
    }
  })
}

export default function Uploader() {
  const [images, setImages] = useState([])
  const [fileName, setFileName] = useState("NoMarkScan")
  const [status, setStatus] = useState("idle")
  const [alerts, setAlerts] = useState([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const addAlert = (msg, type = "info") => {
    const id = Math.random().toString(36).substr(2, 9)
    setAlerts((prev) => [...prev, { id, msg, type }])
    setTimeout(() => setAlerts((prev) => prev.filter((a) => a.id !== id)), 3000)
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    setStatus("uploading")
    addAlert("Ottimizzazione...", "info")
    try {
      const processed = await Promise.all(acceptedFiles.map(compressImage))
      setImages((prev) => [...prev, ...processed])
      addAlert(`${acceptedFiles.length} foto caricate`, "success")
    } catch (err) {
      addAlert("Errore caricamento", "error")
    } finally {
      setStatus("idle")
    }
  }, [])

  const handleGeneratePdf = async () => {
    if (images.length === 0) return
    setStatus("generating")
    addAlert("Generazione PDF...", "info")
    setTimeout(async () => {
      try {
        await generateImagePdf(images, fileName)
        addAlert("PDF scaricato!", "success")
      } catch (error) {
        addAlert("Errore PDF", "error")
      } finally {
        setStatus("idle")
      }
    }, 100)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  })

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIdx = items.findIndex((i) => i.preview === active.id)
        const newIdx = items.findIndex((i) => i.preview === over.id)
        return arrayMove(items, oldIdx, newIdx)
      })
    }
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

      <div
        {...getRootProps()}
        className={`relative overflow-hidden border-2 border-dashed rounded-[2.5rem] p-8 md:p-20 text-center transition-all duration-500
          ${isDragActive ? "border-blue-500 bg-blue-500/5 scale-[1.01]" : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300"}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            {status === "uploading" ? (
              <ArrowPathIcon className="w-10 h-10 text-blue-600 animate-spin" />
            ) : (
              <PlusIcon className="w-10 h-10 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              {isDragActive ? "Rilascia qui" : "Carica immagini"}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Tocca per selezionare o trascina i file
            </p>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <motion.div
          layout
          className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black">
                {images.length}
              </span>
              <h3 className="font-bold text-slate-800 text-lg">Selezionate</h3>
            </div>
            <button
              onClick={() => setImages([])}
              className="text-slate-400 hover:text-red-500 flex items-center gap-2 text-xs font-bold transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
              <span className="hidden sm:inline">ELIMINA TUTTO</span>
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((i) => i.preview)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {images.map((file, index) => (
                  <SortableImage
                    key={file.preview}
                    file={file}
                    index={index}
                    onRemove={(idx) =>
                      setImages((prev) => prev.filter((_, i) => i !== idx))
                    }
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="mt-12 pt-10 border-t border-slate-50 flex flex-col items-center gap-6">
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full max-w-sm bg-slate-50 px-6 py-4 rounded-2xl text-center font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border border-transparent focus:border-blue-500 text-lg"
              placeholder="Nome del PDF..."
            />

            <button
              onClick={handleGeneratePdf}
              disabled={status === "generating" || images.length === 0}
              className={`w-full md:w-auto px-16 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3
                ${
                  status === "generating"
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
                }`}
            >
              {status === "generating" ? (
                <LoadingDots />
              ) : (
                <>
                  <DocumentArrowDownIcon className="w-6 h-6" />
                  GENERA PDF
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
