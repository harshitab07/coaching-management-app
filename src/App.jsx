import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/Forgot";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import PrivateRoute from "./context/PrivateRoute";
import PublicRoute from "./context/PublicRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/left-students" element={<Students />} />
          <Route path="/active-students" element={<Students />} />
          <Route path="/completed-students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/student/:id" element={<Student />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
