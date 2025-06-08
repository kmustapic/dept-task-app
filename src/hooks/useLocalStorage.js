import { useState, useEffect } from 'react';

/**
 * State hook that syncs with localStorage.
 * @param {string} key localStorage key
 * @param {any} defaultValue default state if none in storage
 * @returns {[any, function]} [value, setValue]
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored != null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  }, [key, value]);

  return [value, setValue];
}

/*
useContext hook would be more appropriate for future app development (more data)
now is still ok to implement local storage logic this way
*/
