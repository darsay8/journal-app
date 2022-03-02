import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';

const AppRouter = () => {
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
