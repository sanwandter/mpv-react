import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../components/Layout'
import { INGREDIENT_CATEGORIES } from '../data/recipes'

const ShoppingList = () => {
  const navigate = useNavigate()
  const { weeklyMenu, ownedIngredients, toggleOwnedIngredient, addToCart } = useContext(AppContext)

  // Calcular todos los ingredientes necesarios
  const allIngredients = useMemo(() => {
    const ingredientsMap = new Map()

    Object.values(weeklyMenu).forEach(day => {
      Object.values(day).forEach(recipe => {
        if (recipe) {
          recipe.ingredients.forEach(ingredient => {
            const key = ingredient.id
            if (ingredientsMap.has(key)) {
              const existing = ingredientsMap.get(key)
              ingredientsMap.set(key, {
                ...existing,
                amount: existing.amount + ingredient.amount,
                recipes: [...existing.recipes, recipe.name]
              })
            } else {
              ingredientsMap.set(key, {
                ...ingredient,
                recipes: [recipe.name]
              })
            }
          })
        }
      })
    })

    return Array.from(ingredientsMap.values())
  }, [weeklyMenu])

  // Agrupar por categoría
  const groupedIngredients = useMemo(() => {
    const groups = {}
    allIngredients.forEach(ing => {
      if (!groups[ing.category]) {
        groups[ing.category] = []
      }
      groups[ing.category].push(ing)
    })
    return groups
  }, [allIngredients])

  const neededIngredients = allIngredients.filter(ing => !ownedIngredients.includes(ing.id))
  const ownedCount = allIngredients.length - neededIngredients.length

  const handleAddAllToCart = () => {
    neededIngredients.forEach(ing => {
      addToCart(ing)
    })
    navigate('/checkout')
  }

  if (allIngredients.length === 0) {
    return (
      <div className="page">
        <div className="page__header">
          <h1 className="page__title">Lista de Compras</h1>
        </div>
        <div className="empty-state">
          <div className="empty-state__icon">📝</div>
          <h2>No hay ingredientes en tu lista</h2>
          <p>Añade recetas a tu planificador para generar la lista de compras</p>
          <button 
            className="btn btn--primary"
            onClick={() => navigate('/planificador')}
          >
            Ir al Planificador
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Lista de Compras</h1>
        <p className="page__subtitle">
          Marca los ingredientes que ya tienes en casa
        </p>
      </div>

      <div className="shopping-summary shopping-summary--sticky">
        <div className="shopping-summary__stat">
          <span className="shopping-summary__label">Total ingredientes</span>
          <span className="shopping-summary__number">{allIngredients.length}</span>
        </div>
        <div className="shopping-summary__stat">
          <span className="shopping-summary__label">Ya tienes</span>
          <span className="shopping-summary__number">{ownedCount}</span>
        </div>
        <div className="shopping-summary__stat shopping-summary__stat--highlight">
          <span className="shopping-summary__label">Por comprar</span>
          <span className="shopping-summary__number">{neededIngredients.length}</span>
        </div>
        <div className="shopping-summary__stat">
          <span className="shopping-summary__label">Costo estimado</span>
          <span className="shopping-summary__number">
            ${neededIngredients.reduce((sum, ing) => sum + ing.price, 0).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="shopping-list">
        {Object.entries(groupedIngredients).map(([category, ingredients]) => (
          <div key={category} className="ingredient-category">
            <h3 className="ingredient-category__title">
              {INGREDIENT_CATEGORIES[category].emoji} {INGREDIENT_CATEGORIES[category].label}
            </h3>
            <div className="ingredient-list">
              {ingredients.map(ingredient => {
                const isOwned = ownedIngredients.includes(ingredient.id)
                return (
                  <div 
                    key={ingredient.id}
                    className={`ingredient-item ${isOwned ? 'ingredient-item--owned' : ''}`}
                  >
                    <label className="ingredient-item__checkbox">
                      <input
                        type="checkbox"
                        checked={isOwned}
                        onChange={() => toggleOwnedIngredient(ingredient.id)}
                      />
                      <span className="checkbox-custom"></span>
                    </label>
                    <div className="ingredient-item__info">
                      <span className="ingredient-item__name">
                        {ingredient.name}
                      </span>
                      <span className="ingredient-item__amount">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                      <span className="ingredient-item__recipes">
                        Para: {ingredient.recipes.join(', ')}
                      </span>
                    </div>
                    <span className="ingredient-item__price">
                      ${ingredient.price.toFixed(2)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {neededIngredients.length > 0 && (
        <div className="action-bar">
          <button 
            className="btn btn--primary btn--large"
            onClick={handleAddAllToCart}
          >
            🛒 Añadir {neededIngredients.length} productos al carrito
          </button>
        </div>
      )}

      {neededIngredients.length === 0 && (
        <div className="success-message">
          <span className="success-message__icon">✅</span>
          <p>¡Tienes todos los ingredientes! No necesitas comprar nada.</p>
        </div>
      )}
    </div>
  )
}

export default ShoppingList
