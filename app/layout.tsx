import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quickie Lab | Management System",
  description: "High-end Medical Laboratory Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 min-h-screen relative overflow-x-hidden`}
      >
        
        {/* Global Ambient Background Glows */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none z-[-1]"></div>
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-[-1]"></div>

        {/* Global Floating Navigation */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 shadow-2xl rounded-2xl px-6 py-4 z-50 flex items-center justify-between transition-all">
          
          {/* Logo Area */}
          <a href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:shadow-[0_0_20px_rgba(52,211,153,0.5)] transition-shadow">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-zinc-100 tracking-tight text-xl">
              Quickie Lab
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Home</a>
            <a href="/medicaltests" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Tests</a>
            <a href="/categories" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Categories</a>
            <a href="/units" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Units</a>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-zinc-400 cursor-pointer hover:text-zinc-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        </header>

        {/* Main Content Wrapper (padding-top ensures content doesn't hide behind the floating header) */}
        <main className="relative z-10 pt-32 pb-12 min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}