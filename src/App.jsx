import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter basename="/IT323_AppDev_SmartVote_UI">
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/FaceVerification" element={<FaceVerification />} />

      
      <Route path="/StudentDashboard" element={<StudentDashboard />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/VoteAnalysis" element={<VoteAnalysis />} />
      <Route path="/Profile" element={<Profile />} />

      
      <Route path="/Dashboard" element={<AdminDashboard />} />
      <Route path="/VoterLog" element={<VoterLog />} />
      <Route path="/ManageCandidates" element={<ManageCandidates />} />

     
      <Route path="/Results" element={<Results />} />

      
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;