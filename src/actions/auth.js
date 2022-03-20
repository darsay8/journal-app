import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from '@firebase/auth';
import Swal from 'sweetalert2';
import { googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { notesLogout } from './notes';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
  return dispatch => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch(e => {
        dispatch(finishLoading());
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return dispatch => {
    dispatch(startLoading());
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user.auth.currentUser, { displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch(e => {
        dispatch(finishLoading());
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const startGoogleLogin = () => {
  return dispatch => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch(e => {
        console.log('Error: ', e);
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName },
});

export const startLogOut = () => {
  return async dispatch => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(logout());
    dispatch(notesLogout());
  };
};

export const logout = () => ({ type: types.logout });
