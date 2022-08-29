import * as React from "react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Login from "./pages/login/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import Home from "./pages/dashboard/home/Home"
import Companies from "./pages/dashboard/companies/Companies"
import Jobs from "./pages/dashboard/jobs/Jobs"
import { AuthContextProvider } from "./store/auth-context"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./pages/dashboard/profile/Profile"
import Job from "./pages/dashboard/job/Job"
import Register from "./pages/register/Register"
import Landing from "./pages/landing/Landing"
import RegisterCompany from "./pages/register-company/RegisterCompany"

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Routes >
          <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route path="/dashboard/home" element={<Home />} />
            <Route path="/dashboard/companies" element={<Companies />} />
            <Route path="/dashboard/jobs" element={<Jobs />} />
            <Route path="/dashboard/job/:id" element={<Job />} />
            <Route path="/dashboard/profile/:id" element={<Profile />} />
          </Route>
        </Routes>
      </AuthContextProvider>
      <ToastContainer />
    </ChakraProvider>
  )
}

