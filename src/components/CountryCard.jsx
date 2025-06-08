import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import defaultFlag from '../images/flag-default.png';

export default function CountryCard({ country, onSave, onRemove, isSaved }) {
  // If country.flag is falsy or empty string, use defaultFlag
  const flagSrc = country.flag || defaultFlag;

  return (
    <div
      className="card cursor-pointer mx-2 flex flex-col"
      style={{ minHeight: '28rem' }}
    >
      {/* Flag image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={flagSrc}
          alt={`${country.name} flag`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Country info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {country.name}
        </h3>
        <div className="flex justify-center items-center text-gray-600 mb-6">
          <FiMapPin className="mr-1" />
          <span className="text-2xl">{country.capital}</span>
        </div>

        <div className="flex-grow" />

        {/* Buttons row 1: Save or Remove */}
        <div className="flex justify-center mb-2">
          {!isSaved ? (
            <button
              onClick={() => onSave(country)}
              className="btn px-4 py-2 text-sm"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => onRemove(country.code)}
              className="btn bg-red-500 hover:bg-red-700 px-4 py-2 text-sm"
            >
              Remove
            </button>
          )}
        </div>

        {/* Buttons row 2: Show More */}
        <div className="flex justify-center">
          <Link to={`/country/${country.code}`}>
            <button className="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 text-sm">
              Show more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
