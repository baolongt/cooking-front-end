import React from 'react';
import AppContent from './layouts/appContent.js';
import AppLayout from './layouts/appLayout.js';
import { Routes, Route } from 'react-router-dom';
import RecipeDetail from '../pages/recipeDetail.js';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index path="/" element={<AppContent />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
