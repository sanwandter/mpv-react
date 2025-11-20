import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { RECIPES, MEAL_TYPES } from '../data/recipes'
import { AppContext } from '../components/Layout'
import RecipeCard from '../components/RecipeCard'
import Modal from '../components/Modal'

// Formato de precio: sin decimales y con punto como separador de miles
function formatPrice(value) {
  const n = Math.round(Number(value))
  if (Number.isNaN(n)) return '0'
  // Convertir a string y agregar puntos cada 3 dígitos desde la derecha
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

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
    imageUrl: '',
    ingredients: []
  })
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    amount: '',
    unit: 'g',
    category: 'verduras'
  })

  // Unidades de medida disponibles
  const UNITS = [
    { value: 'g', label: 'gramos (g)' },
    { value: 'kg', label: 'kilogramos (kg)' },
    { value: 'ml', label: 'mililitros (ml)' },
    { value: 'l', label: 'litros (l)' },
    { value: 'unidad', label: 'unidad' },
    { value: 'unidades', label: 'unidades' },
    { value: 'cdta', label: 'cucharadita' },
    { value: 'cda', label: 'cucharada' },
    { value: 'taza', label: 'taza' },
    { value: 'pizca', label: 'pizca' },
    { value: 'al gusto', label: 'al gusto' }
  ]
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
    if (!newIngredient.name || !newIngredient.amount || !newIngredient.unit || !newIngredient.category) {
      alert('⚠️ Completa todos los campos del ingrediente')
      return
    }
    
    // Generar precio estimado basado en la categoría (simulación)
    const estimatedPrices = {
      verduras: 800,
      frutas: 900,
      carnes: 3000,
      pescados: 3500,
      lacteos: 1500,
      panaderia: 600,
      cereales: 1200,
      legumbres: 1000,
      despensa: 1800,
      otros: 1000
    }
    
    const ingredient = {
      id: `custom-${Date.now()}-${Math.random()}`,
      name: newIngredient.name,
      amount: parseFloat(newIngredient.amount),
      unit: newIngredient.unit,
      category: newIngredient.category,
      price: estimatedPrices[newIngredient.category] || 1000
    }
    
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredient]
    }))
    
    // Reset manteniendo la unidad seleccionada
    setNewIngredient({
      name: '',
      amount: '',
      unit: newIngredient.unit,
      category: 'verduras'
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
      imageUrl: '',
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
                    <span className="price">${formatPrice(ing.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="recipe-details__total">
                <strong>Costo total estimado: </strong>
                ${formatPrice(selectedRecipe.ingredients.reduce((sum, ing) => sum + ing.price, 0))}
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

          <h3>Ingredientes *</h3>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '1rem' }}>
            Añade los ingredientes necesarios para tu receta
          </p>
          
          {newRecipe.ingredients.length > 0 && (
            <div className="ingredients-list" style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#333', marginBottom: '0.5rem' }}>
                Ingredientes añadidos ({newRecipe.ingredients.length})
              </h4>
              {newRecipe.ingredients.map(ing => (
                <div key={ing.id} className="ingredient-item-new" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: '#2c5f2d' }}>{ing.name}</strong>
                    <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                      {ing.amount} {ing.unit}
                    </span>
                    <span style={{ color: '#999', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                      ({ing.category})
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveIngredient(ing.id)}
                    className="btn-remove-small"
                    title="Eliminar ingrediente"
                    style={{
                      background: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="ingredient-form" style={{
            padding: '1.5rem',
            backgroundColor: '#f5f8f5',
            borderRadius: '12px',
            border: '2px solid #97c97e'
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '1rem', color: '#2c5f2d' }}>
              ➕ Añadir ingrediente
            </h4>
            
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Nombre del ingrediente *
              </label>
              <input
                type="text"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                className="select-input"
                placeholder="Ej: Tomate, Arroz, Pollo..."
              />
            </div>

            <div className="form-row" style={{ gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Cantidad *
                </label>
                <input
                  type="number"
                  value={newIngredient.amount}
                  onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
                  className="select-input"
                  placeholder="Ej: 250"
                  step="0.1"
                  min="0"
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Unidad *
                </label>
                <select
                  value={newIngredient.unit}
                  onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                  className="select-input"
                >
                  {UNITS.map(unit => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Categoría *
              </label>
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
                <option value="otros">📦 Otros</option>
              </select>
            </div>

            <button
              onClick={handleAddIngredient}
              className="btn btn--primary"
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={!newIngredient.name || !newIngredient.amount || !newIngredient.category}
            >
              ➕ Añadir este ingrediente a la receta
            </button>
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
