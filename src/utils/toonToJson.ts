type Block = { path: string; count: number; keys: string[]; rows: string[][] }

function parseHeader(line: string): Block | null {
  const m = line.match(/^([\w\/.]+)\[(\d+)\]\{([^}]*)\}:?$/)
  if (!m) return null
  const [, path, count, keys] = m
  return { path, count: Number(count), keys: keys.split(',').map(s=>s.trim()), rows: [] }
}

export function toonToJson(input: string): string {
  const lines = input.split(/\r?\n/).map(l=>l.trimEnd())
  const blocks: Block[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) { i++; continue }
    const header = parseHeader(line)
    if (header) {
      i++
      while (i < lines.length && lines[i].trim()) {
        const row = lines[i].trim()
        if (!row) break
        const cols = row.replace(/^\s*/, '').split(',')
        header.rows.push(cols)
        i++
      }
      blocks.push(header)
    } else i++
  }

  const root: any = {}
  for (const b of blocks) {
    const pathParts = b.path.split(/\.|\//)
    let cursor = root
    for (let j=0;j<pathParts.length;j++) {
      const p = pathParts[j]
      if (j === pathParts.length - 1) {
        const arr: any[] = []
        for (const r of b.rows) {
          const obj: any = {}
          for (let k=0;k<b.keys.length;k++) {
            const key = b.keys[k]
            const val = r[k] !== undefined ? r[k] : ''
            const num = Number(val)
            obj[key] = (!isNaN(num) && String(num) === val) ? num : val
          }
          arr.push(obj)
        }
        cursor[p] = arr
      } else {
        cursor[p] = cursor[p] || {}
        cursor = cursor[p]
      }
    }
  }

  return JSON.stringify(root, null, 2)
}
