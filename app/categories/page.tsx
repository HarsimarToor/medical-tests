'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('testcategories').select('*');
    setCategories(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await supabase.from('testcategories').insert([{ name, description }]);
    setName(''); setDescription('');
    fetchCategories();
  }

  const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all";

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col pt-10 px-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight mb-2">
            Test Categories
          </h1>
          <p className="text-zinc-400">Organize your laboratory tests into logical groups and departments.</p>
        </div>
        
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
           </svg>
        </div>
      </div>

      {/* Add Category Card */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-[2rem] p-6 shadow-2xl mb-10">
        <h2 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Create New Category
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <input 
              className={inputClass} 
              placeholder="Category (e.g. Hematology)" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="md:col-span-1">
            <input 
              className={inputClass} 
              placeholder="Short Description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
            />
          </div>
          <div className="md:col-span-1">
            <button type="submit" className="w-full h-full min-h-[48px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5">
              Add Category
            </button>
          </div>
        </form>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-zinc-900/20 border border-dashed border-zinc-800 rounded-[2rem]">
            <p className="text-zinc-500">No categories found. Start by adding one above.</p>
          </div>
        ) : (
          categories.map((c) => (
            <div key={c.id} className="group relative p-6 bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-zinc-800/80 hover:border-cyan-500/50 transition-all duration-300 shadow-xl overflow-hidden">
              {/* Subtle hover decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                    {c.name}
                  </h3>
                  <div className="text-zinc-600 group-hover:text-cyan-500/50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9l-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                  {c.description || "No description provided for this category."}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}