import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { doRequest } from '../utils/api';
import CountryCard from './CountryCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function SolutionPage({
  token,
  message,
  setMessage,
  logout,
  countries,
  setCountries,
}) {
  const navigate = useNavigate();
  const [savedList, setSavedList] = useLocalStorage('savedCountries', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  const fetchCountries = async () => {
    setMessage({ type: '', text: '' });
    setCountries([]);

    // Fetch basics
    const data = await doRequest({
      url: 'https://bootcamp2025.depster.me/api/countries',
      method: 'GET',
      body: null,
      token,
      setMessage,
    });
    if (!data) return;

    const rawList = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
      ? data.data
      : [];

    // Enrich with rest api, so I could fetch more data,
    // that will be used in dynamic routes,
    // showing detailed page for each country 'CountryDetailPage.jsx'
    const enriched = await Promise.all(
      rawList.map(async (basic) => {
        let capital = 'N/A';
        let area = 0;
        let population = 0;
        let flag = '';

        try {
          const rc = await fetch(
            `https://restcountries.com/v3.1/alpha/${basic.code}`
          );
          if (rc.ok) {
            const [info] = await rc.json();
            capital = Array.isArray(info.capital)
              ? info.capital[0]
              : info.capital || 'N/A';
            area = info.area || 0;
            population = info.population || 0;
            flag = info.flags?.png || info.flags?.svg || '';
          }
        } catch {
          // ignore enrichment errors
        }

        return {
          code: basic.code,
          name: basic.name,
          capital,
          area,
          population,
          flag,
        };
      })
    );

    setCountries(enriched);
    setMessage({ type: 'success', text: 'Countries fetched successfully!' });
  };

  const saveCountry = (country) => {
    if (!savedList.some((c) => c.code === country.code)) {
      setSavedList((prev) => [...prev, country]);
    }
  };

  const removeCountry = (code) =>
    setSavedList((prev) => prev.filter((c) => c.code !== code));

  const isSaved = (code) => savedList.some((c) => c.code === code);

  // Filter & sort
  const visible = countries
    .filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'area-asc':
          return a.area - b.area;
        case 'area-desc':
          return b.area - a.area;
        case 'pop-asc':
          return a.population - b.population;
        case 'pop-desc':
          return b.population - a.population;
        default:
          return 0;
      }
    });

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar backTo="/" token={token} logout={logout} />

      {/* fixed button row */}
      <div className="fixed top-12 left-0 w-full bg-gray-100 z-10 flex items-end justify-center h-20">
        <div className="flex space-x-4 mb-2">
          <button onClick={fetchCountries} className="btn">
            Fetch Countries
          </button>
          <Link to="/saved">
            <button className="btn">Saved Countries</button>
          </Link>
          <Link to="/show-map">
            <button className="btn">Show Map</button>
          </Link>
        </div>
      </div>

      <div className="pt-32" />

      <div className="w-full flex justify-center mb-2">
        {message.text && (
          <div
            className={
              message.type === 'error'
                ? 'error-message'
                : 'success-message'
            }
          >
            {message.text}
          </div>
        )}
      </div>

      {/* search + sort */}
      {countries.length > 0 && (
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-2 mb-4 space-x-4">
          <input
            type="text"
            placeholder="Search fetched countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field flex-grow"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="input-field w-64"
          >
            <option value="">— sort by —</option>
            <option value="area-asc">Area: small → large</option>
            <option value="area-desc">Area: large → small</option>
            <option value="pop-asc">Population: small → large</option>
            <option value="pop-desc">Population: large → small</option>
          </select>
        </div>
      )}

      {/* country cards */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 mb-8">
        {visible.map((country) => (
          <CountryCard
            key={country.code}
            country={country}
            onSave={saveCountry}
            onRemove={removeCountry}
            isSaved={isSaved(country.code)}
          />
        ))}
      </div>
    </div>
  );
}
