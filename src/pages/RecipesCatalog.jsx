import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { RECIPES, MEAL_TYPES } from '../data/recipes'
import { AppContext } from '../components/Layout'
import RecipeCard from '../components/RecipeCard'
import Modal from '../components/Modal'

const RecipesCatalog = () => {
  const navigate = useNavigate()
  const { addRecipeToMenu, weeklyMenu } = useContext(AppContext)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState('monday')
  const [selectedMealType, setSelectedMealType] = useState('lunch')
  const [showNewRecipeModal, setShowNewRecipeModal] = useState(false)
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    category: 'lunch',
    servings: 2,
    prepTime: '30 min',
    difficulty: 'Fácil',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    ingredients: []
  })
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    amount: '',
    unit: '',
    category: 'despensa'
  })
  const [customRecipes, setCustomRecipes] = useState([])

  const allRecipes = [...RECIPES, ...customRecipes]

  const filteredRecipes = filterCategory === 'all' 
    ? allRecipes 
    : allRecipes.filter(r => r.category === filterCategory)

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe)
  }

  const handleAddToMenu = () => {
    setShowAddModal(true)
  }

  const confirmAddToMenu = () => {
    if (selectedRecipe) {
      addRecipeToMenu(selectedDay, selectedMealType, selectedRecipe)
      setShowAddModal(false)
      setSelectedRecipe(null)
      // Mostrar confirmación
      alert(`✅ ${selectedRecipe.name} agregada al ${MEAL_TYPES[selectedMealType].label} del ${getDayLabel(selectedDay)}`)
    }
  }

  const getDayLabel = (day) => {
    const days = {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo'
    }
    return days[day]
  }

  const handleAddIngredient = () => {
    if (!newIngredient.name || !newIngredient.amount || !newIngredient.unit) {
      alert('⚠️ Completa todos los campos del ingrediente')
      return
    }
    
    const ingredient = {
      id: `custom-${Date.now()}-${Math.random()}`,
      name: newIngredient.name,
      amount: parseFloat(newIngredient.amount),
      unit: newIngredient.unit,
      category: newIngredient.category,
      price: 0 // Precio por defecto, lo maneja el supermercado
    }
    
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredient]
    }))
    
    setNewIngredient({
      name: '',
      amount: '',
      unit: '',
      category: 'despensa'
    })
  }

  const handleRemoveIngredient = (ingredientId) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== ingredientId)
    }))
  }

  const handleSaveNewRecipe = () => {
    if (!newRecipe.name) {
      alert('⚠️ Ingresa un nombre para la receta')
      return
    }
    if (newRecipe.ingredients.length === 0) {
      alert('⚠️ Agrega al menos un ingrediente')
      return
    }

    const recipe = {
      ...newRecipe,
      id: `custom-recipe-${Date.now()}`,
      servings: parseInt(newRecipe.servings)
    }

    setCustomRecipes(prev => [...prev, recipe])
    setShowNewRecipeModal(false)
    
    // Reset form
    setNewRecipe({
      name: '',
      category: 'lunch',
      servings: 2,
      prepTime: '30 min',
      difficulty: 'Fácil',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      ingredients: []
    })
    
    alert('✅ Receta creada exitosamente!')
  }

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Catálogo de Recetas</h1>
        <p className="page__subtitle">
          Descubre nuestras recetas sugeridas y añádelas a tu planificador semanal
        </p>
      </div>

      <div className="filters">
        <button 
          className={filterCategory === 'all' ? 'filter-btn filter-btn--active' : 'filter-btn'}
          onClick={() => setFilterCategory('all')}
        >
          Todas
        </button>
        <button 
          className={filterCategory === 'breakfast' ? 'filter-btn filter-btn--active' : 'filter-btn'}
          onClick={() => setFilterCategory('breakfast')}
        >
          🌅 Desayunos
        </button>
        <button 
          className={filterCategory === 'lunch' ? 'filter-btn filter-btn--active' : 'filter-btn'}
          onClick={() => setFilterCategory('lunch')}
        >
          ☀️ Almuerzos
        </button>
        <button 
          className={filterCategory === 'dinner' ? 'filter-btn filter-btn--active' : 'filter-btn'}
          onClick={() => setFilterCategory('dinner')}
        >
          🌙 Cenas
        </button>
        <button 
          className="btn btn--primary"
          onClick={() => setShowNewRecipeModal(true)}
          style={{ marginLeft: 'auto' }}
        >
          ➕ Crear Receta
        </button>
      </div>

      <div className="recipes-grid">
        {filteredRecipes.map(recipe => (
          <RecipeCard 
            key={recipe.id}
            recipe={recipe}
            onSelect={handleSelectRecipe}
            actionLabel="Ver Detalles"
          />
        ))}
      </div>

      {/* Modal de detalles de receta */}
      <Modal 
        isOpen={selectedRecipe !== null && !showAddModal}
        onClose={() => setSelectedRecipe(null)}
        title={selectedRecipe?.name}
      >
        {selectedRecipe && (
          <div className="recipe-details">
            <img 
              src={selectedRecipe.imageUrl} 
              alt={selectedRecipe.name}
              className="recipe-details__image"
            />
            <div className="recipe-details__info">
              <div className="recipe-details__meta">
                <span>👥 {selectedRecipe.servings} porciones</span>
                <span>⏱️ {selectedRecipe.prepTime}</span>
                <span>📊 {selectedRecipe.difficulty}</span>
              </div>
              <h3>Ingredientes necesarios:</h3>
              <ul className="recipe-details__ingredients">
                {selectedRecipe.ingredients.map(ing => (
                  <li key={ing.id}>
                    {ing.name} - {ing.amount} {ing.unit}
                    <span className="price">${ing.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="recipe-details__total">
                <strong>Costo total estimado: </strong>
                ${selectedRecipe.ingredients.reduce((sum, ing) => sum + ing.price, 0).toFixed(2)}
              </div>
              <div className="recipe-details__actions">
                <button 
                  className="btn btn--primary"
                  onClick={handleAddToMenu}
                >
                  ➕ Añadir a Mi Semana
                </button>
                <button 
                  className="btn btn--secondary"
                  onClick={() => setSelectedRecipe(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal para seleccionar día y comida */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="¿Cuándo quieres preparar esta receta?"
      >
        <div className="add-to-menu">
          <div className="form-group">
            <label>Día de la semana:</label>
            <select 
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="select-input"
            >
              <option value="monday">Lunes</option>
              <option value="tuesday">Martes</option>
              <option value="wednesday">Miércoles</option>
              <option value="thursday">Jueves</option>
              <option value="friday">Viernes</option>
              <option value="saturday">Sábado</option>
              <option value="sunday">Domingo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tipo de comida:</label>
            <select 
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
              className="select-input"
            >
              <option value="breakfast">🌅 Desayuno</option>
              <option value="lunch">☀️ Almuerzo</option>
              <option value="dinner">🌙 Cena</option>
            </select>
          </div>
          <div className="modal-actions">
            <button 
              className="btn btn--primary"
              onClick={confirmAddToMenu}
            >
              Confirmar
            </button>
            <button 
              className="btn btn--secondary"
              onClick={() => setShowAddModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para crear nueva receta */}
      <Modal
        isOpen={showNewRecipeModal}
        onClose={() => setShowNewRecipeModal(false)}
        title="Crear Nueva Receta"
      >
        <div className="new-recipe-form">
          <div className="form-group">
            <label>Nombre de la receta *</label>
            <input
              type="text"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
              className="select-input"
              placeholder="Ej: Pasta con tomate"
            />
          </div>

          <div className="form-group">
            <label>Categoría *</label>
            <select
              value={newRecipe.category}
              onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
              className="select-input"
            >
              <option value="breakfast">🌅 Desayuno</option>
              <option value="lunch">☀️ Almuerzo</option>
              <option value="dinner">🌙 Cena</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Porciones *</label>
              <input
                type="number"
                value={newRecipe.servings}
                onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
                className="select-input"
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Tiempo *</label>
              <input
                type="text"
                value={newRecipe.prepTime}
                onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
                className="select-input"
                placeholder="30 min"
              />
            </div>
            <div className="form-group">
              <label>Dificultad *</label>
              <select
                value={newRecipe.difficulty}
                onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value })}
                className="select-input"
              >
                <option value="Muy Fácil">Muy Fácil</option>
                <option value="Fácil">Fácil</option>
                <option value="Media">Media</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>URL de imagen (opcional)</label>
            <input
              type="text"
              value={newRecipe.imageUrl}
              onChange={(e) => setNewRecipe({ ...newRecipe, imageUrl: e.target.value })}
              className="select-input"
              placeholder="https://..."
            />
          </div>

          <hr style={{ margin: '1.5rem 0' }} />

          <h3>Ingredientes</h3>
          
          {newRecipe.ingredients.length > 0 && (
            <div className="ingredients-list">
              {newRecipe.ingredients.map(ing => (
                <div key={ing.id} className="ingredient-item-new">
                  <span><strong>{ing.name}</strong> - {ing.amount} {ing.unit}</span>
                  <button
                    onClick={() => handleRemoveIngredient(ing.id)}
                    className="btn-remove-small"
                    title="Eliminar ingrediente"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="ingredient-form">
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <input
                  type="text"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                  className="select-input"
                  placeholder="Ej: Tomates cherry"
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <input
                  type="number"
                  value={newIngredient.amount}
                  onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
                  className="select-input"
                  placeholder="Ej: 2"
                  step="0.1"
                  min="0"
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <input
                  type="text"
                  value={newIngredient.unit}
                  onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                  className="select-input"
                  placeholder="kg, ml, unidades"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <select
                  value={newIngredient.category}
                  onChange={(e) => setNewIngredient({ ...newIngredient, category: e.target.value })}
                  className="select-input"
                >
                  <option value="verduras">🥕 Verduras</option>
                  <option value="frutas">🍎 Frutas</option>
                  <option value="carnes">🥩 Carnes</option>
                  <option value="pescados">🐟 Pescados</option>
                  <option value="lacteos">🥛 Lácteos</option>
                  <option value="panaderia">🍞 Panadería</option>
                  <option value="cereales">🌾 Cereales</option>
                  <option value="legumbres">🫘 Legumbres</option>
                  <option value="despensa">🥫 Despensa</option>
                </select>
              </div>
              <button
                onClick={handleAddIngredient}
                className="btn btn--secondary"
                style={{ marginTop: '0' }}
              >
                ➕ Añadir Ingrediente
              </button>
            </div>
          </div>

          <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
            <button 
              className="btn btn--primary"
              onClick={handleSaveNewRecipe}
            >
              Guardar Receta
            </button>
            <button 
              className="btn btn--secondary"
              onClick={() => setShowNewRecipeModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default RecipesCatalog
