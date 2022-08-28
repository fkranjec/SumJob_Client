import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Container,
  Button,
  ButtonGroup,
  Heading,
  Spacer,
  Show,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import Navigation from "./components/Navigation"
import Post from "./components/Post"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Login from "./pages/login/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import Home from "./pages/dashboard/home/Home"
import Companies from "./pages/dashboard/companies/Companies"
import Jobs from "./pages/dashboard/jobs/Jobs"
import { AuthContextProvider } from "./store/auth-context"
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastContainer } from "react-toastify"
import Profile from "./pages/dashboard/profile/Profile"
import Job from "./pages/dashboard/job/Job"
import Register from "./pages/register/Register"
import Landing from "./pages/landing/Landing"
import RegisterCompany from "./pages/register-company/RegisterCompany"
import { TransitionGroup, CSSTransition } from 'react-transition-group'
export const App = () => {
  const location = useLocation()
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location}>
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
          </CSSTransition>
        </TransitionGroup>

      </AuthContextProvider>
      <ToastContainer />

    </ChakraProvider>
  )
}

