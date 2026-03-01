import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Vote from "./pages/vote";
import Dashboard from "./pages/Dashboard";
import FaceVerification from "./pages/FaceVerification";
import StudentDashboard from "./pages/StudentDashboard";
import VoterLog from "./pages/VoterLog";
import VoteAnalysis from "./pages/VoteAnalysis";
import Profile from "./pages/Profile";

const App = () => (
  <BrowserRouter basename="/IT323_AppDev_SmartVote_UI">
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/FaceVerification" element={<FaceVerification />} />

      {/* Student */}
      <Route path="/StudentDashboard" element={<StudentDashboard />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/VoteAnalysis" element={<VoteAnalysis />} />
      <Route path="/Profile" element={<Profile />} />

      {/* Admin */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/voter-log" element={<VoterLog />} />
    </Routes>
  </BrowserRouter>
);

export default App;
