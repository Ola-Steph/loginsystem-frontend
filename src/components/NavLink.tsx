// components/NavLink.tsx
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './NavLink.module.css'; // Assuming you have a separate CSS file for NavLink styles

// Define the props for NavLink component
interface NavLinkProps {
  href: string; // The URL the link points to
  className?: string; // Optional additional class names
  children: ReactNode; // The content inside the link (e.g., text)
}

// NavLink component
const NavLink = ({ href, className, children }: NavLinkProps) => {
  return (
    <Link href={href}>
      <a className={`${styles.navLink} ${className}`}>{children}</a> {/* Combine default and passed class names */}
    </Link>
  );
};

export default NavLink;
