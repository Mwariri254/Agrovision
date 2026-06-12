// Central API base URL
// In development: empty string (Vite proxy handles /api → localhost:3001)
// In production: set VITE_API_URL env var to your Railway backend URL
const API_BASE = import.meta.env.VITE_API_URL || ''

export default API_BASE
