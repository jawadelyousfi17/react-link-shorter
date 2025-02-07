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
import Create from "./comps/links/create";
import Edit from "./comps/links/edit";
import GoogleCallbacl from "./comps/google-sign";

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
        <div className="h-10"></div>
        <Divider orientation=""></Divider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        <Route
        path="/auth/callback"
          element = {
            <GoogleCallbacl />
          }
        />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
