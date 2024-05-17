import "./App.css";
import "./media-query.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/views/Home";
import Signin from "./components/views/Signin";
import Register from "./components/views/Register";
import Activate from "./components/views/Activate";
import Tags from "./components/views/Tags";
import Level from "./components/views/Level";
import Dashboard from "./components/views/dashboard/Dashboard";
import { useEffect, useState } from "react";
import DashboardHome from "./components/views/dashboard/DashboardHome";
import ProSidebar from "./components/layouts/ProSidebar";
import Roadmap from "./components/views/dashboard/Roadmap";
import Saved from "./components/views/dashboard/Saved";
import Detail from "./components/views/dashboard/Detail";
import { usePersistStore } from "./store";

function App() {
  const { token, user } = usePersistStore((s) => s); // Accessing token and user from the global state
  const [collapsed, setCollapsed] = useState(""); // State to manage sidebar collapsed state
  const handleStateChange = (value) => {
    setCollapsed(value); // Function to update collapsed state
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const arrow = document.querySelector(".closeArrow");
      if (arrow) {
        if (scrollTop > 10) {
          arrow.style.display = "none"; // Hide arrow on scroll down
        } else {
          arrow.style.display = "block"; // Show arrow on scroll up
        }
      }
    };
    window.addEventListener("scroll", handleScroll); // Adding scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleaning up event listener
    };
  }, []);

  return (
    <Router>
      {token && user ? ( // Check if user is logged in
        <>
          {window.location.pathname === "/tags" ? ( // Check if current path is /tags
            <Tags /> // Render Tags component
          ) : window.location.pathname === "/level" ? ( // Check if current path is /level
            <Level /> // Render Level component
          ) : (
            <div className="dashboardMain">
              <div
                className="sidebarMain"
                style={{
                  display: "flex",
                  height: "90%",
                  minHeight: "calc(100vh - 20px)",
                }}>
                <ProSidebar handleStateChange={handleStateChange} />
                <main
                  className={`w-100 ${
                    collapsed ? "mainCollapsed" : "mainNotCollapsed"
                  }`}
                  style={{ padding: 20 }}>
                  <Routes>
                    <Route
                      path="/"
                      element={<DashboardHome collapsed={collapsed} />}
                    />
                    <Route
                      path="/dashboard"
                      element={<Dashboard collapsed={collapsed} />}
                    />
                    <Route
                      path="/roadmap"
                      element={<Roadmap collapsed={collapsed} />}
                    />
                    <Route
                      path="/saved"
                      element={<Saved collapsed={collapsed} />}
                    />
                    <Route
                      path="/details/:id"
                      element={<Detail collapsed={collapsed} />}
                    />
                  </Routes>
                </main>
              </div>
            </div>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate" element={<Activate />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
