import React from 'react'
import { Sun, Moon, Github } from 'lucide-react'
import { Button } from './ui'

export default function Header({ theme, setTheme }: { theme: 'light'|'dark'; setTheme: (t: 'light'|'dark') => void }) {
  return (
    <header className="sticky top-0 z-40">
      <div className="backdrop-blur bg-white/60 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 inline-flex items-center justify-center shadow-md">
              <div className="text-white font-extrabold">T</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold leading-tight">TOON Converter</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Fast JSON ↔ TOON conversion</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}> {theme === 'dark' ? <Sun /> : <Moon />} </Button>
            
          </div>
        </div>
      </div>
    </header>
  )
}
