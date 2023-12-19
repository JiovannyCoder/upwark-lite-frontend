import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages
import Home from "./pages/home/Home";

// components
import Navbar from './components/Navbar.jsx'
import Login from './pages/login/Login.js';
import Signup from './pages/signup/Signup.js';
import useAuthContext from './hooks/useAuthContext.js';
import Dashboard from './pages/dashboard/Dashboard.js';
import Profil from './pages/dashboard/profil/Profil.js';
import FreelancerJobs from './pages/dashboard/freelancer/FreelancerJobs.js';
import FreelancerAppliedJobs from './pages/dashboard/freelancer/FreelancerAppliedJobs.js';
import FreelancerJobDetail from './pages/dashboard/freelancer/FreelancerJobDetail.js';
import FreelancerAppliedJobDetail from './pages/dashboard/freelancer/FreelancerAppliedJobDetail.js';
import EmployerProposal from './pages/dashboard/employer/EmployerProposal.js';
import EmployerProposalDetail from './pages/dashboard/employer/EmployerProposalDetail.js';
import CreateProposal from './pages/dashboard/employer/CreateProposal.js';

function App() {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          >
            <Route
              path="profil"
              element={<Profil />}
            />
            <Route
              path="jobs"
              element={<FreelancerJobs />}
            />
            <Route
              path="jobs/:id"
              element={<FreelancerJobDetail />}
            />
            <Route
              path="applied-jobs"
              element={<FreelancerAppliedJobs />}
            />
            <Route
              path="applied-jobs/:id"
              element={<FreelancerAppliedJobDetail />}
            />
            <Route
              path="proposals"
              element={<EmployerProposal />}
            />
            <Route
              path="create-proposal"
              element={<CreateProposal />}
            />
            <Route
              path="proposals/:id"
              element={<EmployerProposalDetail />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
