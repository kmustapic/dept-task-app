import { useNavigate } from 'react-router-dom';
import logo from '../images/dept-logo.png';
import BackButton from './BackButton';

export default function Navbar({ backTo, token, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-100 z-20 flex items-center justify-between px-4 py-2 shadow-none">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Dept Logo" className="w-12 h-auto" />
        <BackButton to={backTo} />
      </div>
      {token && logout && (
        <button onClick={handleLogout} className="btn">
          Log out
        </button>
      )}
    </div>
  );
}
