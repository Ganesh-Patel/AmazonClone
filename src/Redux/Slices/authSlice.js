import { createSlice } from '@reduxjs/toolkit';
import auth from '../../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(userCredential.user));
    dispatch(setStatus('succeeded'));
    alert('login successful');
    useNavigate('/home');
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const signup = (email, password) => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    dispatch(setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // Add other serializable fields you need
    }));
    dispatch(setStatus('succeeded'));
    alert('Signup successful');
    useNavigate('/login');
  } catch (error) {
    console.error('Signup error:', error);
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(setUser(null));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
export const { setUser, setStatus, setError } = authSlice.actions; // Corrected here
