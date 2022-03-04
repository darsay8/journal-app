import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
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
        console.log('Error: ', e);
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
        console.log('Error: ', e);
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
