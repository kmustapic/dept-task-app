import { Link } from 'react-router-dom';

export default function HomePage({
  email,
  setEmail,
  password,
  setPassword,
  register,
  login,
  message,
  token,
  logout,
}) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
      {token && (
        <button
          onClick={logout}
          className="btn absolute top-4 right-4"
        >
          Log out
        </button>
      )}

      <h1 className="text-6xl font-bold text-gray-800 mb-8 text-center">
        Dept Bootcamp App
      </h1>

      {message.text && (
        <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
          {message.text}
        </div>
      )}

      {!token ? (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex gap-4">
            <button onClick={register} className="btn">
              Register
            </button>
            <button onClick={login} className="btn">
              Login
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 mb-6">
          <Link to="/task">
            <button className="btn">Task</button>
          </Link>
          <Link to="/solution">
            <button className="btn">Show Solution</button>
          </Link>
        </div>
      )}
    </div>
  );
}