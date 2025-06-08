import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

export default function CountryDetailPage({ token, logout }) {
  const { code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState({
    name: '',
    callingCodes: '',
    region: '',
    subregion: '',
    population: null,
    demonym: '',
    area: null,
    currencies: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  useEffect(() => {
    (async () => {
      try {
        // Fetch the country by its ISO code
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!res.ok) throw new Error(res.statusText);
        // Parse JSON
        const js = await res.json();
        const info = js[0] || {};

        // Build the international dialing codes string
        let calling = '–';
        if (info.idd?.root && Array.isArray(info.idd.suffixes)) {
          calling = info.idd.suffixes.map(s => info.idd.root + s).join(', ');
        }

        // Extract and format the currencies
        const currs = info.currencies || {};
        const currencies = Object.entries(currs).map(([c, cur]) => `${cur.name} (${c})`);

        // Get the demonym
        let dem = '–';
        if (info.demonyms?.eng?.m) dem = info.demonyms.eng.m;

        setCountry({
          name: info.name?.common || code,
          callingCodes: calling,
          region: info.region || '–',
          subregion: info.subregion || '–',
          population: info.population || 0,
          demonym: dem,
          area: info.area || 0,
          currencies,
        });
      } catch (e) {
        console.error(e);
        setError('Error fetching country data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading country details…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar backTo="/solution" token={token} logout={logout} />

      {/* Spacer */}
      <div className="pt-16" />

      {/* Country Name */}
      <h1 className="text-5xl font-bold text-gray-800 text-center mt-6">
        {country.name}
      </h1>

      {/* Square map in English mode */}
      <div className="mt-6 flex justify-center px-4">
        <div className="w-3/4 max-w-2xl aspect-square rounded overflow-hidden shadow-lg">
          <iframe
            title={`map-${code}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(country.name)}&hl=en&output=embed`}
            className="w-full h-full object-cover"
            allowFullScreen
          />
        </div>
      </div>

      {/* Details Grid */}
      <div className="mt-8 max-w-2xl mx-auto bg-gray-800 text-white rounded-lg shadow p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 transform transition duration-200 hover:scale-105">
        <div><span className="font-semibold">Calling Codes:</span> {country.callingCodes}</div>
        <div><span className="font-semibold">Region:</span> {country.region}</div>
        <div><span className="font-semibold">Subregion:</span> {country.subregion}</div>
        <div><span className="font-semibold">Population:</span> {country.population.toLocaleString('en-US')}</div>
        <div><span className="font-semibold">Demonym:</span> {country.demonym}</div>
        <div><span className="font-semibold">Area:</span> {country.area.toLocaleString('en-US')} km²</div>
        <div className="sm:col-span-2"><span className="font-semibold">Currencies:</span> {country.currencies.join(', ')}</div>
      </div>

      {/* Extra bottom spacing */}
      <div className="h-16" />
    </div>
  );
}