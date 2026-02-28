import { useParams } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import styles from './ProductDetailsPage.module.css'

// Shows details for a single product.
// For now we only read the product id from the URL.
// Later we will look up the product from our products data.
export function ProductDetailsPage() {
  // useParams lets us read the dynamic part of the URL, e.g. /products/123.
  const { productId } = useParams()

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.imagePlaceholder} />
        <div className={styles.content}>
          <h1>Product #{productId}</h1>
          <p className={styles.price}>₹ 999.00</p>
          <p>
            When we add real product data, this section will show the product name, shade, finish,
            skin type, and a cute description.
          </p>
          <p className={styles.meta}>Category: Makeup / Skincare / Accessories</p>
          <div className={styles.actions}>
            <Button>Add to cart</Button>
            <Button variant="secondary">Add to wishlist</Button>
            <Button variant="ghost">Buy now</Button>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

export default ProductDetailsPage

