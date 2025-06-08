import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { doRequest } from './utils/api';

import HomePage from './components/HomePage';
import TaskPage from './components/TaskPage';
import SolutionPage from './components/SolutionPage';
import SavedCountries from './components/SavedCountries';
import ShowMap from './components/ShowMap';
import CountryDetailPage from './components/CountryDetailPage';
import LoadingPage from './components/LoadingPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (!message.text) return;
    const onInteraction = () => setMessage({ type: '', text: '' });
    window.addEventListener('keydown', onInteraction);
    window.addEventListener('pointerdown', onInteraction);
    return () => {
      window.removeEventListener('keydown', onInteraction);
      window.removeEventListener('pointerdown', onInteraction);
    };
  }, [message.text]);

  async function register() {
    const data = await doRequest({
      url: 'https://bootcamp2025.depster.me/registration',
      method: 'POST',
      body: { email, password },
      token: '',
      setMessage,
    });
    if (data) setMessage({ type: 'success', text: 'Registered! You can log in.' });
  }

  async function login() {
    const data = await doRequest({
      url: 'https://bootcamp2025.depster.me/login',
      method: 'POST',
      body: { email, password },
      token: '',
      setMessage,
    });
    if (data?.data?.token) {
      setToken(data.data.token);
      setMessage({ type: 'success', text: 'Logged in successfully!' });
    }
  }

  async function getTask() {
    const data = await doRequest({
      url: 'https://bootcamp2025.depster.me/task',
      method: 'GET',
      body: null,
      token,
      setMessage,
    });
    if (data) {
      setTask(data);
      setMessage({ type: 'success', text: 'Task retrieved!' });
    }
  }

  function logout() {
    setToken('');
    setTask(null);
    setMessage({ type: '', text: '' });
    setCountries([]);
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  register={register}
                  login={login}
                  message={message}
                  token={token}
                  logout={logout}
                />
              }
            />
            <Route
              path="/task"
              element={
                <TaskPage
                  token={token}
                  task={task}
                  getTask={getTask}
                  message={message}
                  logout={logout}
                />
              }
            />
            <Route
              path="/solution"
              element={
                <SolutionPage
                  token={token}
                  message={message}
                  setMessage={setMessage}
                  logout={logout}
                  countries={countries}
                  setCountries={setCountries}
                />
              }
            />
            <Route
              path="/saved"
              element={
              <SavedCountries 
                token={token} 
                logout={logout} 
              />}
            />
            <Route
              path="/show-map"
              element={
              <ShowMap
                token={token}
                logout={logout}
              />
              }
            />
            <Route
              path="/country/:code"
              element={
              <CountryDetailPage 
                token={token} 
                logout={logout} 
              />
            }
            />
            <Route 
              path="*" 
              element={<NotFoundPage />} 
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
