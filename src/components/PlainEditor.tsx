import React, { useEffect, useRef } from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
  language?: 'json' | 'text'
  readOnly?: boolean
}

export default function PlainEditor({ value, onChange, language = 'text', readOnly = false }: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const refResize = useRef<number | null>(null)

  // Keep the textarea flexible but constrained by CSS max-height.
  // Rely on CSS `max-height` and `overflow-auto` so the editor behaves well on mobile.
  useEffect(()=>{
    const el = ref.current
    if (!el) return
    // ensure height fits content but does not exceed max-height
    const adjust = ()=>{
      el.style.height = 'auto'
      const max = el.clientHeight
      el.style.height = `${Math.min(el.scrollHeight, el.scrollHeight)}px`
    }
    adjust()
    window.addEventListener('resize', adjust)
    return ()=> window.removeEventListener('resize', adjust)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (language === 'json') {
      const text = e.clipboardData.getData('text')
      try {
        const parsed = JSON.parse(text)
        const pretty = JSON.stringify(parsed, null, 2)
        e.preventDefault()
        onChange(pretty)
      } catch {}
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <textarea
        ref={ref}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        readOnly={readOnly}
        className="w-full p-3 bg-transparent resize-none outline-none text-sm font-mono min-h-[120px] max-h-[60vh] overflow-auto"
      />
    </div>
  )
}
