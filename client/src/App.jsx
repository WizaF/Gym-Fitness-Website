import { Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Scene from "./components/Scene.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import AuthModal from "./components/AuthModal.jsx";
import Home from "./pages/Home.jsx";
import Schedule from "./pages/Schedule.jsx";
import Payments from "./pages/Payments.jsx";
import WallOfHeart from "./pages/WallOfHeart.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  const { pathname } = useLocation();
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [pathname]);

  return (
    <>
      {/* One persistent 3D scene behind every page */}
      <Scene home={pathname === "/"} />
      <Nav />
      <AuthModal />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/Wall-of-Heart" element={<WallOfHeart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
