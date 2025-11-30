import React from 'react'

export default function AboutSection(){
  return (
    <section className="mt-6 grid gap-4">
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left: How to use (steps) */}
        <div className="p-5 rounded-2xl card-modern">
          <h3 className="text-lg font-semibold">How to Use the JSON → TOON Converter</h3>
          <ol className="mt-4 space-y-4">
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-violet-500 text-white font-bold">1</div>
              <div>
                <div className="font-medium">Paste Your JSON Data</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Copy JSON from an API response, DB export, or file and paste into the left editor. The converter validates JSON automatically.</div>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-cyan-500 text-white font-bold">2</div>
              <div>
                <div className="font-medium">Click Convert to TOON</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Press the <strong>Convert</strong> button (or use Ctrl/Cmd+Enter). The app runs the conversion locally in your browser.</div>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-500 text-white font-bold">3</div>
              <div>
                <div className="font-medium">Review Token Savings</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">See estimated input/output tokens and percentage reduction to understand savings for LLM usage.</div>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-rose-500 text-white font-bold">4</div>
              <div>
                <div className="font-medium">Copy and Use</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Click <strong>Copy to Clipboard</strong> or download the TOON file to use in prompts, APIs, or pipelines.</div>
              </div>
            </li>
          </ol>
        </div>

        {/* Right: Why choose, features as horizontal hoverable cards */}
        <div className="p-1">
          <h3 className="text-lg font-semibold mb-3">Why Choose Our JSON → TOON Converter</h3>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <div className="flex-1 min-w-[200px] p-4 rounded-lg card-modern transform transition hover:-translate-y-1 hover:shadow-xl">
              <div className="font-medium">Instant Conversion</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">All conversions run locally in your browser with no server round-trips — instant results and full privacy.</div>
            </div>

            <div className="flex-1 min-w-[200px] p-4 rounded-lg card-modern transform transition hover:-translate-y-1 hover:shadow-xl">
              <div className="font-medium">Proven Token Reduction</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">Independent tests show average reductions ~46.3% with some datasets reaching ~60% token savings — helpful when optimizing LLM costs.</div>
            </div>

            <div className="flex-1 min-w-[200px] p-4 rounded-lg card-modern transform transition hover:-translate-y-1 hover:shadow-xl">
              <div className="font-medium">Privacy-First</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">Your data never leaves your browser. No uploads, no logging — suitable for sensitive data workflows.</div>
            </div>

            <div className="flex-1 min-w-[200px] p-4 rounded-lg card-modern transform transition hover:-translate-y-1 hover:shadow-xl">
              <div className="font-medium">Easy Integration</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">Copy output directly to clipboard or download as a <code>.toon</code>/<code>.txt</code> file for quick usage in automation or prompts.</div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-indigo-600 text-white">
              <div className="text-lg font-bold">46.3%</div>
              <div className="text-xs">Average token reduction</div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Save tokens on LLM prompts and reduce costs — conversions are deterministic and reproducible.</div>
          </div>
        </div>
      </div>

      {/* Optional full-width tip card */}
      <div className="p-4 rounded-2xl card-modern">
        <div className="font-medium">Quick Tips</div>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">For best results, ensure arrays of objects in JSON have consistent keys. Use the preview to confirm field order and values before copying to prompts.</div>
      </div>
    </section>
  )
}
