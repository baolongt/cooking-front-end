import React, { useEffect, useState } from 'react';
import AppContent from './layouts/appContent.js';
import AppLayout from './layouts/appLayout.js';
import { Routes, Route } from 'react-router-dom';
import RecipeDetail from '../pages/recipeDetail.js';
import UserDetail from '../pages/user/userDetail.js';
import RecipeAdd from './recipe/recipeAdd.js';
import 'react-toastify/dist/ReactToastify.css';
import RecipeEdit from './recipe/recipeEdit.js';
import MealList from '../pages/meal/listMeal.js';
import MealOrder from './meal/mealOrder.js';
import SignIn from '../pages/auth/signin.js';
import SignUp from '../pages/auth/signup.js';
import AddMeal from '../pages/meal/addMeal.js';
import Orders from '../pages/user/orders.js';
import ModPage from '../pages/mod/index.js';
import GuestLayout from './layouts/guestLayout.js';
import ModLayout from './layouts/modLayout.js';
import PreviewRecipe from '../pages/mod/previewRecipe.js';
import OrdersModPage from '../pages/mod/orders.js';
import IngredientsModPage from '../pages/mod/ingrediens.js';
import IngredientAddForm from './ingredient/createIngredientForm.js';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accountID') != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  if (!isLogin) {
    return (
      <GuestLayout>
        <Routes>
          <Route index path="/" element={<AppContent />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </GuestLayout>
    );
  } else {
    if (localStorage.getItem('role') == 'MOD') {
      return (
        <ModLayout>
          <Routes>
            <Route index path="/" element={<ModPage />} />
            <Route path="/orders" element={<OrdersModPage />} />
            <Route path="/ingredients" element={<IngredientsModPage />} />
            <Route path="/add-ingredient" element={<IngredientAddForm />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/preview/:id" element={<PreviewRecipe />} />
          </Routes>
        </ModLayout>
      );
    }

    if (localStorage.getItem('role') == 'AD') {
      return;
    }

    return (
      <AppLayout>
        <Routes>
          <Route index path="/" element={<AppContent />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/add" element={<RecipeAdd />} />
          <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/meals" element={<MealList />} />
          <Route path="/meals/add/:id" element={<AddMeal />} />
          <Route path="/meals/:id" element={<MealOrder />} />
        </Routes>
      </AppLayout>
    );
  }
}

export default App;
