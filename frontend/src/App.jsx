import { Outlet } from "react-router-dom";
import TopNav from "./components/layout/TopNav";
import { AuthProvider } from "./auth/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <TopNav />
        <Outlet />
      </div>
    </AuthProvider>
  );
}
