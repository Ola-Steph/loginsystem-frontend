// src/pages/register.tsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { registerUser } from '../../redux/authSlice'; // Import the register thunk from the correct path
import { RootState } from '../../redux/store'; // Ensure this path is correct
import Navbar from '../components/Navbar'; // Correct path for a src-level components folder
import styles from './styles/Auth.module.css'; // Add a new CSS module for shared auth styles

const RegisterPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Local state for form inputs
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Extracting loading, error, and token state from Redux
  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  // Handle form submission for registration
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure fields are filled before dispatching
    if (firstName && email && password) {
      dispatch(registerUser({ firstName, email, password }));
    }
  };

  // Redirect to login page on successful registration (when token is available)
  useEffect(() => {
    if (token) {
      router.push('/login'); // Redirect to login
    }
  }, [token, router]);

  return (
    <div>
      <Navbar /> {/* Include Navbar at the top */}
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.authButton} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Display error message if registration fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;
