import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const root = 'c:/Users/Admin/Downloads/Agrovision-main/Agrovision-main'
const files = [
  'client/src/pages/Store.jsx',
  'client/src/pages/AdminPanel.jsx',
  'client/src/pages/FarmMap.jsx',
  'client/src/pages/FieldLogPage.jsx',
  'client/src/pages/SellerDashboard.jsx',
  'client/src/pages/Marketplace.jsx',
]

for (const file of files) {
  const path = join(root, file)
  let content = readFileSync(path, 'utf8')
  const before = content
  let count = 0

  // Split into lines and fix each line
  const lines = content.split('\n')
  const fixed = lines.map(line => {
    // Check if this line has the malformed pattern
    // Pattern to detect: fetch(\" followed by `${API_BASE}/api/...  ending with '
    // In the actual file bytes: fetch( + backslash + backslash + quote + backtick + ...url... + single-quote
    if (line.includes('\\\\"') && line.includes('`${API_BASE}/api/')) {
      // Fix: remove the \\\" prefix and the trailing ' closing quote, replace with proper backtick close
      const newLine = line
        .replace(/fetch\(\\\\"(`\$\{API_BASE\}\/api\/)/g, 'fetch($1')
        .replace(/(fetch\(`\$\{API_BASE\}\/api\/[^`\n]*)'(?=\s*[,{);])/g, '$1`')
      if (newLine !== line) {
        count++
        return newLine
      }
    }
    return line
  })

  content = fixed.join('\n')

  if (content !== before) {
    writeFileSync(path, content, 'utf8')
    console.log(`Fixed ${count} lines in: ${file}`)
  } else {
    console.log(`No changes: ${file}`)
  }
}
