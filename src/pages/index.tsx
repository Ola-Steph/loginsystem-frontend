// pages/index.tsx
import Navbar from '../components/Navbar'; // Adjust path if necessary

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Our Platform</h1>
      <p>This is the landing page of our application. Feel free to explore the features!</p>
      <div>
        <a href="/login" style={{ marginRight: '10px' }}>Login</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default HomePage;
