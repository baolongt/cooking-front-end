import React from 'react';
import AppContent from './layouts/appContent.js';
import AppLayout from './layouts/appLayout.js';
import { Routes, Route } from 'react-router-dom';
import RecipeDetail from '../pages/recipeDetail.js';
import UserDetail from '../pages/user/userDetail.js';
import RecipeAdd from './recipe/recipeAdd.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipeEdit from './recipe/recipeEdit.js';
import MealList from '../pages/meal/listMeal.js';
import MealOrder from './meal/mealOrder.js';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index path="/" element={<AppContent />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/add" element={<RecipeAdd />} />
        <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/meals" element={<MealList />} />
        <Route path="/meals/:id" element={<MealOrder />} />
      </Routes>
      <ToastContainer />
    </AppLayout>
  );
}

export default App;
