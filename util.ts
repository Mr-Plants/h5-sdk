export function generateId(invokeType: number): string {
  return Date.now() + '' + invokeType + Math.floor(Math.random() * 100)
}

export function shouldPrompt() {
  return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'huidu' || process.env.NODE_ENV === 'test'
}

