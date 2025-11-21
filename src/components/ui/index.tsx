import React from 'react'

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div className={`rounded-2xl card-modern ${className}`}>{children}</div>
)

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'ghost'|'outline' }> = ({ children, variant='primary', className='', ...rest }) => {
  const base = 'px-4 py-2 rounded-xl inline-flex items-center gap-2 font-medium shadow-sm select-none'
  const cls = variant === 'primary'
    ? `${base} btn-primary-grad hover:brightness-105` 
    : variant === 'outline'
    ? `${base} btn-ghost-soft` 
    : `${base} bg-transparent`
  return <button className={`${cls} ${className}`} {...rest}>{children}</button>
}

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={`px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/50 focus:ring-2 focus:ring-indigo-300 outline-none ${props.className||''}`} />
)

export const Tabs: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className='' }) => (
  <div className={className}>{children}</div>
)

export const Separator: React.FC = () => <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />

export const Tooltip: React.FC<React.PropsWithChildren<{ content: string }>> = ({ children, content }) => (
  <div className="group relative inline-block">
    {children}
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-xs rounded px-2 py-1">{content}</div>
  </div>
)

export const Switch: React.FC<{ checked?: boolean; onChange?: (v:boolean)=>void }> = ({ checked=false, onChange }) => (
  <button onClick={()=>onChange && onChange(!checked)} className={`w-12 h-7 rounded-full p-1 ${checked? 'bg-gradient-to-r from-violet-500 to-cyan-400':'bg-slate-200'}`}>
    <div className={`w-5 h-5 bg-white rounded-full transform ${checked ? 'translate-x-5' : ''} shadow-sm`}></div>
  </button>
)

export const Sheet: React.FC<React.PropsWithChildren<{ open?: boolean; onClose?: ()=>void; className?: string }>> = ({ children, open=false, onClose, className='' }) => (
  <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black/40 z-50`} onClick={onClose}>
    <div className={`absolute right-0 top-0 h-full w-full max-w-md p-4 ${className}`} onClick={e=>e.stopPropagation()}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 h-full overflow-auto">{children}</div>
    </div>
  </div>
)

export default { Card, Button, Input, Tabs, Separator, Tooltip, Switch, Sheet }
