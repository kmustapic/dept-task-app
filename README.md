# Dept Bootcamp App

A React application that allows users to register/login, fetch random countries from an API, save favorite countries for later, and view country details including capital, population, area, dialing codes, currencies, and map.


---

## Features

* **User Authentication**: Register and login via JWT (/registration, /login).

* **Fetch Random Countries**: Request 1–10 random countries from the Bootcamp API.

* **Save & Remove**: Add desired countries to your personal list and remove them when needed. List persists across sessions.

* **Country Details**: View extended information fetched from Rest Countries API (capital, area, population, demonym, currencies) and an embedded Google Map.

* **Local Storage Persistence**: Saved countries are stored in localStorage, surviving logouts and page reloads.

---

## Future Improvements

* Replace CDN Tailwind with PostCSS build for production.

* Introduce React Context for global auth & saved countries.

* Implement pagination or infinite scroll for large country lists.

* Integrate rate-limit handlers for API errors.
