import * as React from "react"
import { ChakraProvider, Spinner, theme } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Login from "./pages/login/Login"
import './i18n/config';
import Companies from "./pages/dashboard/companies/Companies"
import Jobs from "./pages/dashboard/jobs/Jobs"
import { AuthContextProvider } from "./store/auth-context"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./pages/dashboard/profile/Profile"
import Job from "./pages/dashboard/job/Job"
import Register from "./pages/register/Register"
import Landing from "./pages/landing/Landing"
import RegisterCompany from "./pages/register-company/RegisterCompany"
import JobsByUser from "./pages/dashboard/jobsByUser/JobsByUser"

const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"))
const Home = React.lazy(() => import("./pages/dashboard/home/Home"))

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
              <React.Suspense fallback={<Spinner></Spinner>}>
                <Dashboard />
              </React.Suspense>
            </ProtectedRoute>
          }>
            <Route index element={<React.Suspense fallback={<Spinner></Spinner>}><Home /></React.Suspense>} />
            <Route path="/dashboard/home" element={<React.Suspense fallback={<Spinner></Spinner>}><Home /></React.Suspense>} />
            <Route path="/dashboard/companies" element={<Companies />} />
            <Route path="/dashboard/jobs" element={<Jobs />} />
            <Route path="/dashboard/job/:id" element={<Job />} />
            <Route path="/dashboard/profile/:id" element={<Profile />} />
            <Route path="/dashboard/usersPerJob" element={<JobsByUser />} />
          </Route>
        </Routes>
      </AuthContextProvider>
      <ToastContainer />
    </ChakraProvider>
  )
}

