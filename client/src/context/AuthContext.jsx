import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../api.js";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, mode: "signup", message: "" });

  // On first load, ask the server if the session cookie is still valid
  useEffect(() => {
    api.get("/auth/me").then((d) => setUser(d.user)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  const openAuth = useCallback((mode = "signup", message = "") => setModal({ open: true, mode, message }), []);
  const closeAuth = useCallback(() => setModal((m) => ({ ...m, open: false })), []);

  const login = async (email, password) => { const d = await api.post("/auth/login", { email, password }); setUser(d.user); };
  const register = async (name, email, password) => { const d = await api.post("/auth/register", { name, email, password }); setUser(d.user); };
  const logout = async () => { await api.post("/auth/logout"); setUser(null); };

  return (
    <Ctx.Provider value={{ user, setUser, loading, login, register, logout, modal, openAuth, closeAuth }}>
      {children}
    </Ctx.Provider>
  );
}
