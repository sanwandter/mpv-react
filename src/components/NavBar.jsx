import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from './Layout'

const NavBar = () => {
  const { shoppingCart } = useContext(AppContext)

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <span className="navbar__logo">🛒</span>
          <h1 className="navbar__title">Planificador de Menú</h1>
        </div>
        <ul className="navbar__links">
          <li>
            <NavLink 
              to="/recetas" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            >
              📖 Recetas
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/planificador" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            >
              📅 Mi Semana
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/lista-compras" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            >
              📝 Lista de Compras
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/checkout" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active navbar__link--cart' : 'navbar__link navbar__link--cart'}
            >
              🛒 Carrito
              {shoppingCart.length > 0 && (
                <span className="navbar__badge">{shoppingCart.length}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
