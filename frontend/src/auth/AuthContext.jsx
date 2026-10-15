import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const AUTH_USERS_KEY = "jim-auth-users";
const AUTH_CURRENT_USER_KEY = "jim-current-user";

function loadUsers() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) ?? "{}") || {};
  } catch {
    return {};
  }
}

function loadCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(AUTH_CURRENT_USER_KEY) ?? "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers);
  const [user, setUser] = useState(loadCurrentUser);

  const login = (email, password) => {
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return { error: "Please enter your email and password." };
    }

    const account = users[normalizedEmail];
    if (!account || account.password !== password) {
      return { error: "Invalid email or password." };
    }

    const nextUser = { name: account.name, email: account.email, role: account.role };
    setUser(nextUser);
    localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(nextUser));
    return { user: nextUser };
  };

  const signup = ({ name, email, password, role }) => {
    const normalizedEmail = email?.trim().toLowerCase();
    if (!name || !normalizedEmail || !password) {
      return { error: "Please complete all required fields." };
    }

    if (users[normalizedEmail]) {
      return { error: "This email is already registered." };
    }

    const nextUser = {
      name: name.trim(),
      email: normalizedEmail,
      role: role || "guest",
    };

    const nextUsers = {
      ...users,
      [normalizedEmail]: {
        ...nextUser,
        password,
      },
    };

    setUsers(nextUsers);
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(nextUsers));
    setUser(nextUser);
    localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(nextUser));
    return { user: nextUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
