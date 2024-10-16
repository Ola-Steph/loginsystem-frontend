// redux/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
interface AuthState {
  token: string | null;
  firstName: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  firstName: null,
  loading: false,
  error: null,
};

// Thunk to handle user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      return response.data; // Expecting { token, firstName } from backend
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Thunk to handle user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { firstName: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      return response.data; // Expecting { token, firstName } from backend
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to handle user logout
    logout: (state) => {
      state.token = null;
      state.firstName = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.token = null; // Clear token if login failed
      state.firstName = null;
      state.error = action.payload as string;
    });

    // Handle registration
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.token = null; // Clear token if registration failed
      state.firstName = null;
      state.error = action.payload as string;
    });
  },
});

// Export the logout action
export const { logout } = authSlice.actions;

export default authSlice.reducer;
