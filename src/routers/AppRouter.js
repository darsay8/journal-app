import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import { login } from '../actions/auth';

const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, user => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/" element={<JournalScreen />} />
        <Route path="*" element={<Navigate replace to="/auth/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
