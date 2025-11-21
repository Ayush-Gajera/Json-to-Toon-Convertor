import React, { useEffect, useState } from 'react'
import Home from './pages/Home'

export default function App() {
  const [theme, setTheme] = useState<'light'|'dark'>(() => (localStorage.getItem('theme') as 'light'|'dark') || 'light')
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  return (
    <div className="min-h-screen">
      <Home theme={theme} setTheme={setTheme} />
    </div>
  )
}
