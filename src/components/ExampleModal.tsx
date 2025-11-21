import React from 'react'
import { Sheet, Button } from './ui'

export default function ExampleModal({ open, onClose, onInsert }: { open: boolean; onClose: ()=>void; onInsert: (text: string, mode: 'json'|'toon')=>void }) {
  const sampleJson = `{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}`
  const sampleToon = `users[2]{id,name}:
  1,Alice
  2,Bob`

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Example Snippets</h3>
        <div>
          <div className="text-sm text-slate-500 mb-2">JSON Example</div>
          <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded">{sampleJson}</pre>
          <div className="flex gap-2 mt-2">
            <Button onClick={()=>{ onInsert(sampleJson, 'json'); onClose() }}>Insert JSON</Button>
          </div>
        </div>

        <div>
          <div className="text-sm text-slate-500 mb-2">TOON Example</div>
          <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded">{sampleToon}</pre>
          <div className="flex gap-2 mt-2">
            <Button onClick={()=>{ onInsert(sampleToon, 'toon'); onClose() }}>Insert TOON</Button>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Sheet>
  )
}
