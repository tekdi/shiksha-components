import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    const localStorageRefreshToken = localStorage.getItem('refreshToken');
    const sessionRefreshToken = sessionStorage.getItem('refreshToken');
    if (localStorageToken && localStorageRefreshToken) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    } else {
      if (sessionToken && sessionRefreshToken) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
      }
    }
    localStorage.removeItem('userId');
    localStorage.removeItem('parentCohortId');

    navigate('/login');

    // window.location.reload();
  }, []);

  return '';
}

export default Logout;
