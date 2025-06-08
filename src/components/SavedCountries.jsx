import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CountryCard from './CountryCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function SavedCountries({ token, logout }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useLocalStorage('savedCountries', []);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const removeCountry = (code) => {
    setSaved((prev) => prev.filter((c) => c.code !== code));
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar backTo="/solution" token={token} logout={logout} />

      {/* push content below navbar */}
      <div className="pt-16" />

      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Saved Countries
      </h1>

      {saved.length > 0 ? (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 px-2">
          {saved.map((country) => (
            <CountryCard
              key={country.code}
              country={country}
              isSaved={true}
              onRemove={removeCountry}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No saved countries found.</p>
      )}
    </div>
  );
}
