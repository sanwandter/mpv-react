import React from 'react'

const RecipeCard = ({ recipe, onSelect, actionLabel = 'Ver Detalles' }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.name} className="recipe-card__image" />
      <div className="recipe-card__content">
        <h3 className="recipe-card__title">{recipe.name}</h3>
        <div className="recipe-card__meta">
          <span className="recipe-card__meta-item">👥 {recipe.servings} porciones</span>
          <span className="recipe-card__meta-item">⏱️ {recipe.prepTime}</span>
          <span className="recipe-card__meta-item">📊 {recipe.difficulty}</span>
        </div>
        <div className="recipe-card__ingredients">
          <p className="recipe-card__ingredients-title">Ingredientes:</p>
          <ul className="recipe-card__ingredients-list">
            {recipe.ingredients.slice(0, 3).map(ing => (
              <li key={ing.id}>{ing.name}</li>
            ))}
            {recipe.ingredients.length > 3 && (
              <li className="recipe-card__ingredients-more">
                +{recipe.ingredients.length - 3} más...
              </li>
            )}
          </ul>
        </div>
        <button 
          className="recipe-card__button"
          onClick={() => onSelect(recipe)}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

export default RecipeCard
