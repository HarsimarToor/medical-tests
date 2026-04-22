import React from 'react';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center pt-10 px-6">
      
      {/* Hero Section */}
      <div className="text-center max-w-2xl mb-16 mt-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tracking-tight mb-6">
          Laboratory Management
        </h1>
        <p className="text-lg text-zinc-400 font-medium leading-relaxed">
          Streamline your medical tests, configure categories, and manage measurement units from one centralized hub.
        </p>
      </div>

      {/* Interactive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* Card 1: Medical Tests */}
        <a href="/medicaltests" className="group relative p-8 bg-zinc-900/40 backdrop-blur-md rounded-[2rem] border border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-900/80 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-between h-full shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 text-emerald-400 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-500">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors">Medical Tests</h2>
            <p className="text-zinc-400 leading-relaxed mb-8">Manage laboratory tests, set reference ranges, and export patient reports.</p>
          </div>
          <div className="relative z-10 flex items-center text-sm font-semibold text-emerald-400 opacity-80 group-hover:opacity-100">
            Configure Tests 
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
          </div>
        </a>

        {/* Card 2: Categories */}
        <a href="/categories" className="group relative p-8 bg-zinc-900/40 backdrop-blur-md rounded-[2rem] border border-zinc-800/80 hover:border-cyan-500/50 hover:bg-zinc-900/80 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-between h-full shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 text-cyan-400 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-500">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-3 group-hover:text-cyan-400 transition-colors">Categories</h2>
            <p className="text-zinc-400 leading-relaxed mb-8">Organize and manage test groups like CBC, LFT, and BCT with ease.</p>
          </div>
          <div className="relative z-10 flex items-center text-sm font-semibold text-cyan-400 opacity-80 group-hover:opacity-100">
            Manage Groups
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
          </div>
        </a>

        {/* Card 3: Units (UOM) */}
        <a href="/units" className="group relative p-8 bg-zinc-900/40 backdrop-blur-md rounded-[2rem] border border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-900/80 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-between h-full shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 text-emerald-400 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-500">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors">Units (UOM)</h2>
            <p className="text-zinc-400 leading-relaxed mb-8">Manage measurement units like mg/dL, IU/L, and ensure data consistency.</p>
          </div>
          <div className="relative z-10 flex items-center text-sm font-semibold text-emerald-400 opacity-80 group-hover:opacity-100">
            Set Units
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
          </div>
        </a>

      </div>
    </div>
  );
}