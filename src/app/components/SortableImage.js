/* eslint-disable @next/next/no-img-element */
"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function SortableImage({ file, index, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: file.preview })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
    scale: isDragging ? 1.05 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group rounded-xl overflow-hidden aspect-square shadow-sm border border-slate-200 bg-white touch-none"
    >
      <div
        {...attributes}
        {...listeners}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <img
          src={file.preview}
          alt="preview"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove(index)
        }}
        className="absolute top-2 right-2 bg-white/95 text-red-600 p-2 rounded-lg shadow-md z-10 transition-opacity opacity-100 md:opacity-0 md:group-hover:opacity-100 active:scale-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md pointer-events-none">
        PAG. {index + 1}
      </div>
    </div>
  )
}
