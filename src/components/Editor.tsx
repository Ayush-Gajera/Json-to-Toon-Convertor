// Editor.tsx: simple compatibility file.
// The app currently uses `PlainEditor` as a stable textarea-based editor.
// Export `PlainEditor` from here so imports of `Editor` continue to work.
export { default } from './PlainEditor'
import React, { useEffect, useRef } from 'react'
