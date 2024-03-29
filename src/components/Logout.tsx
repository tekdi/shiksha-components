import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
    window.location.reload();
  });
  localStorage.clear();

  return '';
}

export default Logout;
