"use client"

export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
      <span className="ml-3 text-sm font-medium">Elaborazione...</span>
    </div>
  )
}
