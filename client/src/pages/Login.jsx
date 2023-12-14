import React, { useState } from 'react';
import './Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const message = await response.text();
      setError(`Login failed: ${message}`); // Set the error message
      return;
    }

    const data = await response.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('user_id', data.user_id);

    window.location.href = 'http://localhost:3000/';
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;