// Central API base URL
// In development: empty string (Vite proxy handles /api → localhost:3001)
// In production: set VITE_API_URL env var to your Railway backend URL
let API_BASE = import.meta.env.VITE_API_URL || ''
if (API_BASE && !API_BASE.startsWith('http://') && !API_BASE.startsWith('https://')) {
  API_BASE = 'https://' + API_BASE
}
if (API_BASE.endsWith('/')) {
  API_BASE = API_BASE.slice(0, -1)
}

export default API_BASE
