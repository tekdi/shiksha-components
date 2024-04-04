import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyTokenStorage } from '../utils/Helper';

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
   
    if (verifyTokenStorage()) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    } else {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
      
    }
    localStorage.removeItem('userId');
    localStorage.removeItem('parentCohortId');

    navigate('/login');

    // window.location.reload();
  }, []);

  return '';
}

export default Logout;
