import axios from 'axios';

// Base URL for the API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Registers a new user.
 * @param firstName - User's first name
 * @param email - User's email
 * @param password - User's password
 * @returns Promise with the user data or error response
 */
export const registerUser = async (firstName: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      firstName,
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user', error);
    throw error;
  }
};

/**
 * Logs in a user.
 * @param email - User's email
 * @param password - User's password
 * @returns Promise with the user data or error response
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

/**
 * Fetches the logged-in user's profile data (if needed).
 * @param token - JWT token for authentication
 * @returns Promise with the user data or error response
 */
export const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile', error);
    throw error;
  }
};
