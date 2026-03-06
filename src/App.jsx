import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Register from "./pages/register";
import FaceVerification from "./pages/FaceVerification";
import StudentDashboard from "./pages/StudentDashboard";
import Vote from "./pages/vote";
import VoteAnalysis from "./pages/VoteAnalysis";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/Dashboard";
import VoterLog from "./pages/VoterLog";
import ManageCandidates from "./pages/ManageCandidates";
import ElectionSettings from "./pages/ElectionSettings";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

const App = () => (
  <BrowserRouter basename="/IT323_AppDev_SmartVote_UI">
    <Routes>

      
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/FaceVerification" element={<FaceVerification />} />

      <Route path="/StudentDashboard" element={
        <ProtectedRoute allowedRole="student">
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/vote" element={
        <ProtectedRoute allowedRole="student">
          <Vote />
        </ProtectedRoute>
      } />
      <Route path="/VoteAnalysis" element={
        <ProtectedRoute allowedRole="student">
          <VoteAnalysis />
        </ProtectedRoute>
      } />
      <Route path="/Profile" element={
        <ProtectedRoute allowedRole="student">
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/Dashboard" element={
        <ProtectedRoute allowedRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/VoterLog" element={
        <ProtectedRoute allowedRole="admin">
          <VoterLog />
        </ProtectedRoute>
      } />
      <Route path="/ManageCandidates" element={
        <ProtectedRoute allowedRole="admin">
          <ManageCandidates />
        </ProtectedRoute>
      } />
      <Route path="/ElectionSettings" element={
        <ProtectedRoute allowedRole="admin">
          <ElectionSettings />
        </ProtectedRoute>
      } />

      <Route path="/Results" element={
        <ProtectedRoute>
          <Results />
        </ProtectedRoute>
      } />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  </BrowserRouter>
);

export default App;