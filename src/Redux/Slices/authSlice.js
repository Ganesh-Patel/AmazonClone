import { createSlice } from '@reduxjs/toolkit';
import auth from '../../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
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

export const login = (email, password, navigate, from) => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    }));
    dispatch(setStatus('succeeded'));
    toast.success('Login successful'); 
    navigate(from, { replace: true });
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
    toast.error(`Login failed: ${error.message}`);
  }
};

export const signup = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    dispatch(setUser(null));
    toast.success('Signup successful');
    navigate('/login');
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
    toast.error(`Signup failed: ${error.message}`);
  }
};

    // dispatch(setUser({
    //   uid: user.uid,
    //   email: user.email,
    //   displayName: user.displayName,
    // }));
    // dispatch(setStatus('succeeded'));

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(setUser(null));
    dispatch(setStatus(null));
    toast.info('Logged out successfully');
    // navigate('/login');
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(`Logout failed: ${error.message}`);
  }
};

export default authSlice.reducer;
export const { setUser, setStatus, setError } = authSlice.actions;
