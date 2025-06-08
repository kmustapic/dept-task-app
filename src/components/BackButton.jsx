import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackButton({ to }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="
        flex items-center justify-center
        w-10 h-10
        rounded-full
        bg-gray-100 hover:bg-gray-200
        focus:outline-none focus:ring-2 focus:ring-gray-300
        transition-colors
      "
      aria-label="Go back"
    >
      <FiArrowLeft className="text-gray-700" size={20} />
    </button>
  );
}
