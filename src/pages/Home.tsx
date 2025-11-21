import React from 'react'
import Header from '../components/Header'
import ConverterPanel from '../components/ConverterPanel'
import Footer from '../components/Footer'

export default function Home({ theme, setTheme }: { theme: 'light'|'dark'; setTheme: (t: 'light'|'dark') => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header theme={theme} setTheme={setTheme} />
      <main className="flex-1 container mx-auto px-4 py-6">
        <section className="mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8 text-center">
  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
    TOON Converter
  </h1>

  <p className="mt-3 sm:mt-4 lg:mt-5 text-slate-600 dark:text-slate-300 max-w-4xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed px-1 sm:px-2">
    Easily convert between JSON and TOON with a fast, lightweight, and intuitive editor.
    TOON is a compact, human-readable data format perfect for sharing arrays and simple records.
    Enjoy autosave, one-click copy/export, and a fully responsive interface across all devices.
  </p>
</section>


        <ConverterPanel />
      </main>
      <Footer />
    </div>
  )
}
