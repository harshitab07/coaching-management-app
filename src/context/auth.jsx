import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      const parsed = JSON.parse(data);
      setAuth(parsed);
      axios.defaults.headers.common['Authorization'] = parsed.token;
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
