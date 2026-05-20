import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Payments from "./pages/Payments";
import Contact from "./pages/Contact";
import Profile from "./pages/ProfilePage.jsx";
import SplitDisplayed from "./components/SplitDisplayed.jsx";
import WallOfHeart from "./pages/WallOfHeart.jsx";
import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUpPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/schedule", element: <Schedule /> },
      { path: "/continue-workout", element: <SplitDisplayed /> },
      { path: "/payments", element: <Payments /> },
      { path: "/contact", element: <Contact /> },
      { path: "/profile", element: <Profile /> },
      { path: "/Wall-of-Heart", element: <WallOfHeart /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
