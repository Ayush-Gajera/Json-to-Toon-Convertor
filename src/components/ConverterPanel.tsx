import React, { useEffect, useRef, useState } from 'react'
import Editor from './PlainEditor'
import TokenStats from './TokenStats'
import { jsonToToon } from '../utils/jsonToToon'
import { toonToJson } from '../utils/toonToJson'
import { estimateTokens } from '../utils/tokenizer'
import { saveFile, readFileAsText } from '../utils/fileHandler'
import { Copy, FileText, Download, Trash2 } from 'lucide-react'
import { Button, Card } from './ui'
import { ToastProvider, useToasts } from './ToastProvider'
import ExampleModal from './ExampleModal'

function useLocalStorage(key: string, initial = '') {
  const [state, setState] = useState<string>(() => localStorage.getItem(key) || initial)
  useEffect(() => { localStorage.setItem(key, state) }, [key, state])
  return [state, setState] as const
}

function PanelInner() {
  const [tab, setTab] = useState<'json-to-toon'|'toon-to-json'>('json-to-toon')
  const [jsonInput, setJsonInput] = useLocalStorage('json-input', '{\n  "users": [\n    { "id": 1, "name": "Alice" },\n    { "id": 2, "name": "Bob" }\n  ]\n}')
  const [toonInput, setToonInput] = useLocalStorage('toon-input', 'users[2]{id,name}:\n  1,Alice\n  2,Bob')
  const [output, setOutput] = useLocalStorage('output', '')
  const [inputTokens, setInputTokens] = useState(0)
  const [outputTokens, setOutputTokens] = useState(0)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const toasts = useToasts()
  const [examplesOpen, setExamplesOpen] = useState(false)

  useEffect(()=>{
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault(); onConvert()
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault(); onCopy()
      }
    }
    window.addEventListener('keydown', handler)
    return ()=> window.removeEventListener('keydown', handler)
  }, [tab, jsonInput, toonInput, output])

  const onConvert = () => {
    try {
      if (tab === 'json-to-toon') {
        const t = jsonToToon(jsonInput)
        setOutput(t)
        setOutputTokens(estimateTokens(t))
        setInputTokens(estimateTokens(jsonInput))
      } else {
        const j = toonToJson(toonInput)
        setOutput(j)
        setOutputTokens(estimateTokens(j))
        setInputTokens(estimateTokens(toonInput))
      }
      toasts.push('Converted successfully')
    } catch (err:any) {
      toasts.push('Conversion error: ' + (err?.message || String(err)))
    }
  }

  const onClear = () => {
    if (tab === 'json-to-toon') setJsonInput('')
    else setToonInput('')
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      toasts.push('Copied output to clipboard')
    } catch (err) {
      toasts.push('Copy failed')
    }
  }

  const onUpload = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let text = ''
      let filename = ''
      if (e && e.target && e.target.files && e.target.files[0]) {
        const f = e.target.files[0]
        filename = f.name
        text = await readFileAsText(f)
      } else if (fileRef.current) {
        const f = fileRef.current.files?.[0]
        if (f) {
          filename = f.name
          text = await readFileAsText(f)
        }
      }
      if (!text) return
      const ext = filename.split('.').pop()?.toLowerCase()
      if (ext === 'json') { setJsonInput(text); setTab('json-to-toon') }
      else if (ext === 'toon' || ext === 'txt') { setToonInput(text); setTab('toon-to-json') }
      else {
        if (tab === 'json-to-toon') setJsonInput(text)
        else setToonInput(text)
      }
      toasts.push('File loaded')
    } catch (err) {
      toasts.push('File upload failed')
    }
  }

  const onDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    const ext = tab === 'json-to-toon' ? 'toon' : 'json'
    saveFile(blob, `output.${ext}`)
    toasts.push('Download started')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Card className="flex gap-2 p-2">
          <Button variant={tab==='json-to-toon' ? 'primary':'ghost'} onClick={()=>setTab('json-to-toon')}>JSON → TOON</Button>
          <Button variant={tab==='toon-to-json' ? 'primary':'ghost'} onClick={()=>setTab('toon-to-json')}>TOON → JSON</Button>
        </Card>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" onClick={()=>setExamplesOpen(true)}>Examples</Button>
          <label className="flex items-center gap-2 p-2 rounded-xl cursor-pointer">
            <input ref={fileRef} type="file" className="hidden" onChange={onUpload} />
            <FileText />
            <span className="text-sm">Upload</span>
          </label>

          <Button onClick={onConvert}>Convert</Button>
          <Button variant="ghost" onClick={onClear}><Trash2 /></Button>
          <Button variant="ghost" onClick={onCopy}><Copy /></Button>
          <Button variant="ghost" onClick={onDownload}><Download /></Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col rounded-2xl overflow-hidden">
          <div className="p-3 bg-white/60 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">Input</div>
          <div className="editor-shell p-3">
            {tab === 'json-to-toon' ? (
              <Editor value={jsonInput} onChange={setJsonInput} language="json" />
            ) : (
              <Editor value={toonInput} onChange={setToonInput} language="text" />
            )}
          </div>
        </div>

        <div className="flex flex-col rounded-2xl overflow-hidden">
          <div className="p-3 bg-white/60 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">Output</div>
          <div className="editor-shell p-3">
            <Editor value={output} onChange={setOutput} language={tab==='json-to-toon'?'text':'json'} readOnly={false} />
          </div>
        </div>
      </div>

      <TokenStats inputTokens={inputTokens} outputTokens={outputTokens} />
      <ExampleModal open={examplesOpen} onClose={()=>setExamplesOpen(false)} onInsert={(text, mode)=>{
        if (mode === 'json') setJsonInput(text)
        else setToonInput(text)
      }} />
    </div>
  )
}

export default function ConverterPanel() {
  return (
    <ToastProvider>
      <PanelInner />
    </ToastProvider>
  )
}
