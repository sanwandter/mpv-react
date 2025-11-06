import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './NavBar'
import RecipesCatalog from '../pages/RecipesCatalog'
import WeeklyPlanner from '../pages/WeeklyPlanner'
import ShoppingList from '../pages/ShoppingList'
import Checkout from '../pages/Checkout'

// Contexto global para el estado de la aplicación
export const AppContext = React.createContext()

const Layout = () => {
  // Estado global de la aplicación
  const [weeklyMenu, setWeeklyMenu] = useState({
    monday: { breakfast: null, lunch: null, dinner: null },
    tuesday: { breakfast: null, lunch: null, dinner: null },
    wednesday: { breakfast: null, lunch: null, dinner: null },
    thursday: { breakfast: null, lunch: null, dinner: null },
    friday: { breakfast: null, lunch: null, dinner: null },
    saturday: { breakfast: null, lunch: null, dinner: null },
    sunday: { breakfast: null, lunch: null, dinner: null }
  })

  const [ownedIngredients, setOwnedIngredients] = useState([])
  const [shoppingCart, setShoppingCart] = useState([])

  const addRecipeToMenu = (day, mealType, recipe) => {
    setWeeklyMenu(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: recipe
      }
    }))
  }

  const removeRecipeFromMenu = (day, mealType) => {
    setWeeklyMenu(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null
      }
    }))
  }

  const toggleOwnedIngredient = (ingredientId) => {
    setOwnedIngredients(prev => {
      if (prev.includes(ingredientId)) {
        return prev.filter(id => id !== ingredientId)
      } else {
        return [...prev, ingredientId]
      }
    })
  }

  const addToCart = (ingredient) => {
    setShoppingCart(prev => {
      const existing = prev.find(item => item.id === ingredient.id)
      if (existing) {
        return prev.map(item =>
          item.id === ingredient.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { ...ingredient, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (ingredientId) => {
    setShoppingCart(prev => prev.filter(item => item.id !== ingredientId))
  }

  const updateCartQuantity = (ingredientId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(ingredientId)
    } else {
      setShoppingCart(prev =>
        prev.map(item =>
          item.id === ingredientId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setShoppingCart([])
  }

  const contextValue = {
    weeklyMenu,
    addRecipeToMenu,
    removeRecipeFromMenu,
    ownedIngredients,
    toggleOwnedIngredient,
    shoppingCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="app">
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/planificador" replace />} />
            <Route path="/recetas" element={<RecipesCatalog />} />
            <Route path="/planificador" element={<WeeklyPlanner />} />
            <Route path="/lista-compras" element={<ShoppingList />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export default Layout
