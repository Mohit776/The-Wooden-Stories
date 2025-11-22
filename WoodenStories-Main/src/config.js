const raw = import.meta.env.VITE_BACKEND_URL;

const localDefault = import.meta.env.DEV ? 'http://localhost:5000' : '';

const base = raw && raw.trim() !== ''
  ? raw.trim().replace(/\/+$/, '')
  : localDefault;

export const BACKEND_BASE_URL = base;
export const API_URL = base ? `${base}/api` : '/api';
