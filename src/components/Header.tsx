import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { totalQuantity } = useCart()
  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
          <span className="logo" aria-hidden>⬡</span>
          <span>Everything Men</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/design/222-6104">Design</NavLink>
          <NavLink to="/cart">Cart ({totalQuantity})</NavLink>
        </nav>
      </div>
    </header>
  )
}
