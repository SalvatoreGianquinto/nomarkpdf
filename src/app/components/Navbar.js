"use client"
import {
  PhotoIcon,
  DocumentTextIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline"

export default function Navbar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "images", label: "Immagini", icon: PhotoIcon },
    { id: "text", label: "Testo", icon: DocumentTextIcon },
  ]

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 p-6 z-40">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Squares2X2Icon className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight">NoMarkPDF</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-8 py-4 flex justify-around items-center z-50">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === item.id
                ? "text-blue-600 scale-110"
                : "text-slate-400"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </>
  )
}
