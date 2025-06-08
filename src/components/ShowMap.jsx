import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function ShowMap({ token, logout }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* fixed navbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-100 z-20 flex items-center justify-between px-4 py-2 shadow-none">
        <Navbar backTo="/solution" token={token} logout={logout} /> 
        {token && (
          <button onClick={handleLogout} className="btn">
            Log out
          </button>
        )}
      </div>

      {/* spacer */}
      <div className="pt-16" />

      {/* full‐screen Google Maps iframe */}
      <iframe
        title="Google Map Fullscreen"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18349655.676052103!2d0.503345567173442!3d20.63804641052989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1598475591249!5m2!1sen!2sus"
        className="w-full"
        style={{ height: 'calc(100vh - 4rem)', border: 0 }}
        allowFullScreen=""
        loading="lazy"
      />
    </div>
  );
}
