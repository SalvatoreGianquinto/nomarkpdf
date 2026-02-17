import Link from "next/link"
import {
  DocumentDuplicateIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

export default function LabHome() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              NoMark<span className="text-blue-600">Lab</span>
            </h1>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Strumenti digitali,
            <br />
            <span className="text-slate-400">senza impronte.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/pdf"
            className="md:col-span-3 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 hover:shadow-2xl hover:border-blue-300 transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative z-10 flex-1">
              <DocumentDuplicateIcon className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-3xl font-bold mb-4">
                NoMark<span className="text-blue-600">PDF</span>
              </h3>
              <p className="text-slate-500 text-lg max-w-md mb-8">
                {
                  "Il tuo spazio privato per gestire documenti. Converti immagini in PDF o usa l'editor di testo con template professionali."
                }
              </p>
              <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider text-sm">
                Apri Strumenti{" "}
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            <div className="relative flex-1 w-full h-64 bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden hidden md:flex items-center justify-center">
              <div className="absolute w-40 h-52 bg-white shadow-xl rounded-lg border border-slate-200 transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500 p-4" />
              <div className="absolute w-32 h-32 bg-blue-600 shadow-2xl rounded-2xl flex items-center justify-center transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                <SparklesIcon className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
          </Link>

          <div className="md:col-span-1 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between overflow-hidden relative border border-slate-800">
            <ShieldCheckIcon className="w-10 h-10 text-emerald-400" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Zero Log</h3>
              <p className="text-slate-400 text-sm">
                Nessun server. I tuoi dati restano solo tuoi.
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
          </div>

          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex items-center justify-between group hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <CpuChipIcon className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-400 group-hover:text-slate-900 transition-colors">
                  Prossimo Tool
                </h4>
                <p className="text-slate-400 text-sm italic">
                  In fase di sviluppo nel Lab...
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-blue-50 border border-blue-100 rounded-[2.5rem] p-8 flex items-center justify-center">
            <p className="text-blue-800 font-medium italic text-center">
              Sviluppato per la produttività senza limiti
            </p>
          </div>
        </div>

        <footer className="mt-16 flex flex-col md:flex-row justify-between items-center border-t border-slate-200 pt-8 gap-4 pb-12">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} NoMark Lab — Salvatore Gianquinto.
          </p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a
              href="https://github.com/SalvatoreGianquinto"
              target="_blank"
              className="hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <span className="hover:text-blue-600 cursor-pointer">
              Privacy Policy
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}
