import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../components/Layout'
import { INGREDIENT_CATEGORIES } from '../data/recipes'

// Formato de precio: sin decimales y con punto como separador de miles
function formatPrice(value) {
  const n = Math.round(Number(value))
  if (Number.isNaN(n)) return '0'
  // Convertir a string y agregar puntos cada 3 dígitos desde la derecha
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const Checkout = () => {
  const navigate = useNavigate()
  const { shoppingCart, removeFromCart, updateCartQuantity, clearCart } = useContext(AppContext)

  const total = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleFinalizePurchase = () => {
    if (shoppingCart.length === 0) {
      alert('⚠️ Tu carrito está vacío')
      return
    }

  // Simulación de compra exitosa
    const itemsCount = shoppingCart.reduce((sum, item) => sum + item.quantity, 0)
  alert(`✅ ¡Compra realizada con éxito!\n\n${itemsCount} productos por $${formatPrice(total)}\n\nTus productos llegararán en 2-3 días hábiles.`)
    clearCart()
    navigate('/planificador')
  }

  // Agrupar por categoría
  const groupedCart = shoppingCart.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = []
    }
    groups[item.category].push(item)
    return groups
  }, {})

  if (shoppingCart.length === 0) {
    return (
      <div className="page">
        <div className="page__header">
          <h1 className="page__title">Carrito de Compras</h1>
        </div>
        <div className="empty-state">
          <div className="empty-state__icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Añade ingredientes desde tu lista de compras</p>
          <button 
            className="btn btn--primary"
            onClick={() => navigate('/lista-compras')}
          >
            Ir a Lista de Compras
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Carrito de Compras</h1>
        <p className="page__subtitle">
          Revisa y confirma tu pedido
        </p>
      </div>

      <div className="checkout-container">
        <div className="cart-items">
          {Object.entries(groupedCart).map(([category, items]) => (
            <div key={category} className="cart-category">
              <h3 className="cart-category__title">
                {INGREDIENT_CATEGORIES[category].emoji} {INGREDIENT_CATEGORIES[category].label}
              </h3>
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__info">
                    <h4 className="cart-item__name">{item.name}</h4>
                    <p className="cart-item__unit">{item.amount} {item.unit}</p>
                    {item.recipes && item.recipes.length > 0 && (
                      <p className="cart-item__recipes">
                        Para: {item.recipes.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="cart-item__actions">
                    <div className="cart-item__controls">
                      <button
                        className="cart-item__btn"
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="cart-item__quantity">{item.quantity}</span>
                      <button
                        className="cart-item__btn"
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item__price">
                      ${formatPrice(item.price * item.quantity)}
                    </div>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.id)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <div className="summary-card">
            <h3 className="summary-card__title">Resumen del Pedido</h3>
            <div className="summary-card__row">
              <span>Productos ({shoppingCart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              <span>${formatPrice(total)}</span>
            </div>
            <div className="summary-card__row">
              <span>Envío</span>
              <span className="summary-card__free">GRATIS</span>
            </div>
            <div className="summary-card__divider"></div>
            <div className="summary-card__row summary-card__total">
              <span>Total</span>
              <span>${formatPrice(total)}</span>
            </div>
            <button 
              className="btn btn--primary btn--block"
              onClick={handleFinalizePurchase}
            >
              Finalizar Compra
            </button>
            <button 
              className="btn btn--secondary btn--block"
              onClick={() => navigate('/lista-compras')}
            >
              Seguir Comprando
            </button>
          </div>

          <div className="delivery-info">
            <h4>📦 Información de Entrega</h4>
            <p>• Entrega gratuita en pedidos superiores a $20</p>
            <p>• Tiempo estimado: 2-3 días hábiles</p>
            <p>• Seguimiento en tiempo real</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
