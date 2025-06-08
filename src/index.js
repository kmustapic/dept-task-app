import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
Styling is done with Tailwind CSS. Loading it via CDN isn’t ideal,
but version conflicts prevented a proper local setup—this is just a temporary workaround.
*/