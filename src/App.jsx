import { Button, CssBaseline, Divider } from "@mui/joy";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth, AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./protected/protectedRoutes";

//CSS
import "./output.css";

// MIN COMPS
import Navbar from "./comps/navbar";
import Login from "./comps/login";
import Signup from "./comps/signup";
import Dashboard from "./comps/dashboard";
import Home from "./comps/home";

function App() {
  const { mode, setMode } = useColorScheme();

  React.useEffect(() => {
    setMode(localStorage.getItem(mode) || "system");
  }, []);

  React.useEffect(() => {
    localStorage.setItem(mode, mode);
  }, [mode]);

  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Navbar mode={mode} setMode={setMode}></Navbar>
        <Divider orientation="horizental"></Divider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
