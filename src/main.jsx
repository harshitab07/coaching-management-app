import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
  </AuthProvider>
)
