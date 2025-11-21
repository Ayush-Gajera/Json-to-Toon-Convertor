import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur mt-6">
      <div className="container mx-auto px-4 py-4 text-sm text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>© {new Date().getFullYear()} TOON Converter. All rights reserved.</div>
        <div className="text-xs text-slate-500">Built for developers — privacy-first, zero-analytics by default.</div>
      </div>
    </footer>
  )
}
