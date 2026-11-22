import React, { createContext, useContext, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bookflix_user")); }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  async function login(email, password) {
    setLoading(true);
    try {
      const data = await api("/auth/login", { method: "POST", body: JSON.stringify({ email: email.trim().toLowerCase(), password }) });
      persist(data);
      return data.user;
    } finally { setLoading(false); }
  }

  async function register(name, email, password) {
    setLoading(true);
    try {
      const data = await api("/auth/register", { method: "POST", body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password }) });
      persist(data);
      return data.user;
    } finally { setLoading(false); }
  }

  function persist(data) {
    localStorage.setItem("bookflix_token", data.token);
    localStorage.setItem("bookflix_user", JSON.stringify(data.user));
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("bookflix_token");
    localStorage.removeItem("bookflix_user");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
