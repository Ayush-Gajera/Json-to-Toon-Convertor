import React from 'react'

export default function TokenStats({ inputTokens, outputTokens }: { inputTokens: number; outputTokens: number }) {
  const saved = inputTokens > 0 ? Math.max(0, Math.round((1 - outputTokens / inputTokens) * 100)) : 0
  return (
    <div className="rounded-2xl p-4 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm w-full">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex-1">
          <div className="text-sm text-slate-500">Input Tokens</div>
          <div className="text-2xl font-semibold">{inputTokens}</div>
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-500">Output Tokens</div>
          <div className="text-2xl font-semibold">{outputTokens}</div>
        </div>
        <div className="flex-1 text-right">
          <div className="text-sm text-slate-500">% Saved</div>
          <div className="text-2xl font-semibold text-emerald-500">{saved}%</div>
        </div>
      </div>
    </div>
  )
}
