import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);

      // 🔥 decode token
      const decoded = jwtDecode(res.data.token);

      alert("Login success");

      // 🔀 role-based navigation
      if (decoded.role === "TRAINER") {
        navigate('/trainer');
      } else {
        navigate('/trainings');
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        className="input-field"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input-field"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="primary-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;