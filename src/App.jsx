import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Vote from "./pages/vote";
import Dashboard from "./pages/Dashboard";
import FaceVerification from "./pages/FaceVerification";
import StudentDashboard from "./pages/StudentDashboard";


const App = () => (
  <BrowserRouter basename="/IT323_AppDev_SmartVote_UI">
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/vote" element={<Vote />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/FaceVerification" element={<FaceVerification />} />
    <Route path="/StudentDashboard" element={<StudentDashboard />} />
  </Routes>
</BrowserRouter>
);

export default App;
