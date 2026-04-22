'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function UnitsPage() {
  const [units, setUnits] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => { fetchUnits(); }, []);

  async function fetchUnits() {
    const { data } = await supabase.from('uom').select('*');
    setUnits(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await supabase.from('uom').insert([{ name, description }]);
    setName(''); setDescription('');
    fetchUnits();
  }

  const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all";

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col pt-10 px-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight mb-2">
            Units of Measure
          </h1>
          <p className="text-zinc-400">Define and manage standardized units (UOM) for lab results.</p>
        </div>
        
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
           </svg>
        </div>
      </div>

      {/* Add Unit Card */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-[2rem] p-6 shadow-2xl mb-10">
        <h2 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Register New Unit
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <input 
              className={inputClass} 
              placeholder="Unit (e.g. mg/dL, IU/L)" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="md:col-span-1">
            <input 
              className={inputClass} 
              placeholder="Description (Optional)" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
            />
          </div>
          <div className="md:col-span-1">
            <button type="submit" className="w-full h-full min-h-[48px] bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-bold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5">
              Add Unit
            </button>
          </div>
        </form>
      </div>

      {/* Units Table Card */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-800/50 border-b border-zinc-800/80">
                <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider w-1/3">Unit Symbol</th>
                <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-sm">
              {units.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-12 text-center text-zinc-500">
                    No units defined yet.
                  </td>
                </tr>
              ) : (
                units.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="py-4 px-6">
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10">
                        {u.name}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-400 italic">
                      {u.description || <span className="text-zinc-600 not-italic">No description provided</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}