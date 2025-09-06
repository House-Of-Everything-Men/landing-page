import { Product } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  return (
    <article className="card">
      <img src={product.imageUrl} alt="" className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <div className="card-row">
          <span className="price">${product.price.toFixed(2)}</span>
          <button className="btn" onClick={() => addItem(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

