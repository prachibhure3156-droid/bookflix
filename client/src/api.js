const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const API = API_URL; // <--- ADD THIS LINE

export function getToken() { return localStorage.getItem("token"); }export async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (getToken()) headers.Authorization = `Bearer ${getToken()}`;
  let response;
  try {
    response = await fetch(`${API}${path}`, { ...options, headers });
  } catch {
    throw new Error(`Cannot reach the BookFlix server at ${API}. Start the backend and check http://localhost:5000/api/health.`);
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
