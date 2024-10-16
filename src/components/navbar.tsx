import Link from 'next/link';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, firstName } = useSelector((state: RootState) => state.auth);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.replace('/login');
  }, [dispatch, router]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Welcome message on the far left */}
        {token && firstName ? (
          <div className={styles.welcomeMessage}>{`Welcome, ${firstName}!`}</div>
        ) : (
          <div className={styles.welcomeMessage}></div> 
        )}

        {/* Centered logo */}
        <div className={styles.logo}>
          MyApp
        </div>

        {/* Navigation Links on the right */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>Home</Link>
          {!token ? (
            <>
              <Link href="/login" className={styles.link}>Login</Link>
              <Link href="/register" className={styles.link}>Register</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className={styles.link}>Dashboard</Link>
              <button
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
