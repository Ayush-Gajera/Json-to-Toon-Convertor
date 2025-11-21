export function estimateTokens(text: string): number {
  if (!text) return 0
  const chars = text.length
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const est = Math.max(1, Math.round(chars / 4))
  return Math.max(est, Math.round(words * 1.3))
}
