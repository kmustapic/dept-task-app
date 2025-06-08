import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function TaskPage({ token, task, getTask, message, logout }) {
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

  // Extract name & description from the task object
  const name = task?.data?.name || '';
  const descriptionRaw = task?.data?.description || '';

  // Split into paragraphs on actual newlines (\n\n)
  const paragraphs = descriptionRaw
    .split(/\n\s*\n/)          // split on blank-line sequences
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return (
    <div className="relative min-h-screen bg-gray-100">

      <div className="fixed top-0 left-0 w-full bg-gray-100 z-20 flex items-center justify-between px-4 py-2 shadow-none">
        <Navbar backTo="/" token={token} logout={logout} />
        {token && (
          <button onClick={handleLogout} className="btn">
            Log out
          </button>
        )}
      </div>

      <div className="pt-16" />

      {/* Show Task button */}
      <div className="w-full flex justify-center mb-6">
        <button onClick={getTask} className="btn">
          Show Task
        </button>
        
      </div>

      {/* Task content */}
      {task && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{name}</h1>
          <div className="space-y-4 text-gray-700">
            {paragraphs.map((para, idx) => {
              // within each paragraph, preserve single newlines
              const lines = para.split(/\n/);
              return (
                <p key={idx}>
                  {lines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {message.text && (
        <div className="w-full flex justify-center mb-2">
          <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
            {message.text}
          </div>
        </div>
      )}
    </div>
  );
}