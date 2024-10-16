// src/pages/login.tsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice'; // Updated the import path
import { useRouter } from 'next/router';
import { RootState } from '../../redux/store'; // Updated the import path
import Navbar from '../components/Navbar'; // Correct path for a src-level components folder
import styles from './styles/Auth.module.css'; // Add a new CSS module for shared auth styles

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, error } = useSelector((state: RootState) => state.auth); // Adjusted selector to 'token'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (token) { // Check if the token exists for authentication
    router.push('/dashboard');  // Redirect to dashboard if authenticated
  }

  return (
    <div>
      <Navbar /> {/* Include Navbar at the top */}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.authButton}>Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
