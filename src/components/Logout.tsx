import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('parentCohortId');

    navigate('/');

    window.location.reload();
  }, []);

  return '';
}

export default Logout;
