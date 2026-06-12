const fs = require('fs')

const files = [
  'client/src/pages/Store.jsx',
  'client/src/pages/AdminPanel.jsx',
  'client/src/pages/FarmMap.jsx',
  'client/src/pages/FieldLogPage.jsx',
  'client/src/pages/SellerDashboard.jsx',
  'client/src/pages/Marketplace.jsx'
]

const backtick = String.fromCharCode(96)
const singleQuote = String.fromCharCode(39)

for (const file of files) {
  let c = fs.readFileSync(file, 'utf8')
  const before = c

  // Fix pattern: fetch(`${API_BASE}/api/...') where closing ' should be `
  // Find all occurrences of fetch(` followed by ${API_BASE}/api/ ... then a ' followed by , { ) or ;
  let result = ''
  let i = 0
  let fixCount = 0

  const openPattern = 'fetch(' + backtick + '${API_BASE}/api/'

  while (i < c.length) {
    const idx = c.indexOf(openPattern, i)
    if (idx === -1) {
      result += c.slice(i)
      break
    }

    result += c.slice(i, idx + openPattern.length)
    let j = idx + openPattern.length

    // Scan forward for a single quote followed by , { ) ;
    let fixed = false
    while (j < c.length) {
      if (c[j] === singleQuote) {
        const next = c[j + 1]
        if (next && /[,{);]/.test(next)) {
          // Replace the closing single quote with backtick
          result += c.slice(idx + openPattern.length, j) + backtick
          i = j + 1
          fixed = true
          fixCount++
          break
        }
      }
      if (c[j] === backtick || c[j] === '\n') {
        // Already properly closed or line ended — don't change
        result += c.slice(idx + openPattern.length, j + 1)
        i = j + 1
        fixed = true
        break
      }
      j++
    }

    if (!fixed) {
      result += c.slice(idx + openPattern.length)
      break
    }
  }

  if (result !== before) {
    fs.writeFileSync(file, result, 'utf8')
    console.log('Fixed ' + fixCount + ' calls in: ' + file)
  } else {
    console.log('No change: ' + file)
  }
}
