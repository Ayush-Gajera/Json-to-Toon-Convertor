function isObject(o: any) {
  return o !== null && typeof o === 'object' && !Array.isArray(o)
}

function flatten(obj: any, prefix = ''): any[] {
  const entries: any[] = []
  if (Array.isArray(obj)) {
    if (obj.length === 0) return entries
    if (obj.every((v: any) => !isObject(v))) {
      const rows = obj.map((v: any) => [String(v)])
      entries.push({ path: prefix || 'root', keys: ['value'], rows })
      return entries
    }
    const keys = Array.from(obj.reduce((s: Set<string>, item: any) => { if (isObject(item)) Object.keys(item).forEach(k => s.add(k)); return s }, new Set<string>()))
    const rows = obj.map((item: any) => keys.map(k => item && item[k] !== undefined ? String(item[k]) : ''))
    entries.push({ path: prefix || 'root', keys, rows })
    return entries
  }

  if (isObject(obj)) {
    const arrays = Object.entries(obj).filter(([,v])=>Array.isArray(v))
    if (arrays.length>0) {
      for (const [k,v] of arrays) {
        const childPrefix = prefix ? `${prefix}.${k}` : k
        entries.push(...flatten(v, childPrefix))
      }
    }
    const primitiveKeys = Object.entries(obj).filter(([,v])=>!Array.isArray(v) && !isObject(v)).map(([k])=>k)
    if (primitiveKeys.length>0) {
      const rows = [primitiveKeys.map(k=>String(obj[k]))]
      entries.push({ path: prefix || 'root', keys: primitiveKeys, rows })
    }
  }
  return entries
}

export function jsonToToon(input: string): string {
  let parsed: any
  try { parsed = JSON.parse(input) } catch (err) { throw new Error('Invalid JSON') }
  const blocks = flatten(parsed, '')
  if (blocks.length === 0) return ''
  const lines: string[] = []
  for (const b of blocks) {
    const name = b.path.replace(/\./g, '/')
    lines.push(`${name}[${b.rows.length}]{${b.keys.join(',')}}:`)
    for (const r of b.rows) lines.push('  ' + r.join(','))
    lines.push('')
  }
  return lines.join('\n')
}
