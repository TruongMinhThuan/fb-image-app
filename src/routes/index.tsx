// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import HomePage from '../pages/home';
import PuzzleImageGame from '../components/PuzzleImageGame';
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='puzzle-game' element={<PuzzleImageGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
