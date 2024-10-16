// pages/dashboard.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Navbar from '../components/Navbar'; // Import Navbar

const DashboardPage = () => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth); // Only get token from auth state

  // Check if user is authenticated by verifying the token
  useEffect(() => {
    if (!token) {
      router.push('/login'); // Redirect to login if the token is not present
    }
  }, [token, router]);

  return (
    <div>
      <Navbar /> {/* Navbar added at the top */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}> {/* Center the text */}
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default DashboardPage;
