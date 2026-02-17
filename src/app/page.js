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
          <Link
            href="/password"
            className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-10 hover:shadow-2xl hover:border-emerald-300 transition-all group relative overflow-hidden flex flex-col justify-between min-h-80"
          >
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-500">
                <ShieldCheckIcon className="w-7 h-7 text-emerald-500 group-hover:text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-3 tracking-tight">
                NoMark<span className="text-emerald-500">Pass</span>
              </h3>
              <p className="text-slate-500 leading-relaxed max-w-70">
                {
                  "Genera chiavi d'accesso inviolabili con entropia hardware locale. Sicurezza totale, zero tracce."
                }
              </p>
            </div>
            <div className="relative z-10 mt-8 flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
              Genera Password{" "}
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
            {/* Effetto luce verde */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>

          <div className="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8 group border border-slate-800">
            <div className="relative z-10 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">
                  Laboratorio Attivo
                </span>
              </div>
              <h3 className="text-white text-3xl font-bold mb-3">
                Nuovi Tool in arrivo
              </h3>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Sto sviluppando nuovi strumenti per rendere NoMarkLab la tua
                suite definitiva per la privacy digitale. Sempre 100%
                client-side.
              </p>
            </div>

            {/* Effetto decorativo sullo sfondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          </div>
          <div className="md:col-span-4 bg-blue-50 border border-blue-100 rounded-[2.5rem] p-8 flex items-center justify-center">
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
