import React, { useState } from 'react';
import { apiPost } from '../services/api';

function Login({ onLoginSuccess }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    apiPost('/auth/login', { username, password })
      .then(async (response) => {
        setLoading(false);
        if (response.ok) {
          const data = await response.json();
          if (onLoginSuccess) {
            onLoginSuccess(data);
          }
        } else if (response.status === 401) {
          setError('Usuario o contraseña incorrectos');
        } else {
          setError('Error al iniciar sesión');
        }
      })
      .catch(() => {
        setLoading(false);
        setError('No se pudo conectar con el servidor');
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

