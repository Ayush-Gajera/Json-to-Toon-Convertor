import React, { createContext, useContext, useState } from 'react'

type Toast = { id: number; message: string }

const ToastContext = createContext({
  push: (msg: string) => {}
})

export function useToasts() {
  return useContext(ToastContext)
}

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const push = (message: string) => {
    const id = Date.now()
    setToasts(t => [...t, { id, message }])
    setTimeout(()=> setToasts(t => t.filter(x=>x.id!==id)), 3500)
  }
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed right-4 bottom-4 flex flex-col gap-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className="bg-slate-900 text-white px-4 py-2 rounded shadow">{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
