import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../components/Layout'
import { MEAL_TYPES, RECIPES } from '../data/recipes'
import Modal from '../components/Modal'

const WeeklyPlanner = () => {
  const navigate = useNavigate()
  const { weeklyMenu, removeRecipeFromMenu, addRecipeToMenu } = useContext(AppContext)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const days = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ]

  const hasAnyMeal = Object.values(weeklyMenu).some(day =>
    day.breakfast || day.lunch || day.dinner
  )

  const handleGenerateShoppingList = () => {
    if (!hasAnyMeal) {
      alert('⚠️ Primero añade algunas recetas a tu planificador')
      return
    }
    navigate('/lista-compras')
  }

  const handleAddMeal = (day, mealType) => {
    setSelectedSlot({ day, mealType })
    setShowRecipeModal(true)
  }

  const handleSelectRecipe = (recipe) => {
    if (selectedSlot) {
      addRecipeToMenu(selectedSlot.day, selectedSlot.mealType, recipe)
      setShowRecipeModal(false)
      setSelectedSlot(null)
    }
  }

  // Filtrar recetas por tipo de comida
  const filteredRecipes = selectedSlot 
    ? RECIPES.filter(recipe => recipe.category === selectedSlot.mealType)
    : RECIPES

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Mi Planificador Semanal</h1>
        <p className="page__subtitle">
          Organiza tus comidas de la semana - Click en "+" para agregar recetas
        </p>
      </div>

      {(
        <>
          <div className="weekly-planner">
            {days.map(day => (
              <div key={day.key} className="day-row">
                <h3 className="day-row__title">{day.label}</h3>
                <div className="day-row__meals">
                  {['breakfast', 'lunch', 'dinner'].map(mealType => (
                    <div key={mealType} className="meal-slot">
                      <div className="meal-slot__header">
                        <span className="meal-slot__type">
                          {MEAL_TYPES[mealType].emoji} {MEAL_TYPES[mealType].label}
                        </span>
                      </div>
                      {weeklyMenu[day.key][mealType] ? (
                        <div className="meal-slot__content">
                          <img 
                            src={weeklyMenu[day.key][mealType].imageUrl}
                            alt={weeklyMenu[day.key][mealType].name}
                            className="meal-slot__image"
                          />
                          <p className="meal-slot__name">
                            {weeklyMenu[day.key][mealType].name}
                          </p>
                          <button
                            className="meal-slot__remove"
                            onClick={() => removeRecipeFromMenu(day.key, mealType)}
                            title="Eliminar"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="meal-slot__empty"
                          onClick={() => handleAddMeal(day.key, mealType)}
                        >
                          + Añadir receta
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {hasAnyMeal && (
            <div className="action-bar">
              <button 
                className="btn btn--primary btn--large"
                onClick={handleGenerateShoppingList}
              >
                📝 Generar Lista de Compras
              </button>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={showRecipeModal}
        onClose={() => {
          setShowRecipeModal(false)
          setSelectedSlot(null)
        }}
        title={`Selecciona ${selectedSlot ? MEAL_TYPES[selectedSlot.mealType].label : 'una receta'}`}
      >
        <div className="recipe-selection">
          <div className="recipe-selection__grid">
            {filteredRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="recipe-selection__item"
                onClick={() => handleSelectRecipe(recipe)}
              >
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.name}
                  className="recipe-selection__image"
                />
                <div className="recipe-selection__info">
                  <h4>{recipe.name}</h4>
                  <p className="recipe-selection__meta">
                    👥 {recipe.servings} | ⏱️ {recipe.prepTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default WeeklyPlanner
