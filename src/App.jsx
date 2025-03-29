import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/Forgot';
import Students from './pages/Students';
import Teachers from './pages/Teachers';

function App() {

  return (
    <>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/students' element={<Students />} />
      <Route path='/teachers' element={<Teachers />} />
    </Routes>
    </>
  )
}

export default App
