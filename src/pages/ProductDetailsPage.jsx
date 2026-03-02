import { useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout.jsx';
import { Button } from '../components/ui/Button.jsx';
import { getProductById } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import styles from './ProductDetailsPage.module.css';

export function ProductDetailsPage() {
  // useParams lets us read the dynamic part of the URL, e.g. /products/123.
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const product = getProductById(productId);

  if (!product) {
    return (
      <AppLayout>
        <p>We could not find this product. It might have been removed from our sample data.</p>
      </AppLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  }

  const handleAddToWishlist = () => {
    addToWishlist(product.id);
  }

  const handleBuyNow = () => {
    addToCart(product.id, 1);
    navigate('/checkout');
  }

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.imagePlaceholder} />
        <div className={styles.content}>
          <h1>{product.name}</h1>
          <p className={styles.price}>₹ {product.price}</p>
          <p>{product.description}</p>
          <p className={styles.meta}>Category: {product.category}</p>
          <div className={styles.actions}>
            <Button onClick={handleAddToCart}>Add to cart</Button>
            <Button variant="secondary" onClick={handleAddToWishlist}>
              Add to wishlist
            </Button>
            <Button variant="ghost" onClick={handleBuyNow}>
              Buy now
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

export default ProductDetailsPage;