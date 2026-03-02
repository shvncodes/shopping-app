import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';
import styles from './OrderCard.module.css';

// Small summary row for an order used in the orders list.
export function OrderCard({ order }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const date = new Date(order.createdAt).toLocaleString();

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.total}>₹ {order.total}</div>
        <div className={styles.meta}>
          {itemCount} item{itemCount !== 1 ? 's' : ''} • {date}
        </div>
        <div className={styles.id}>#{order.id}</div>
      </div>
      <Link to={`/orders/${order.id}`}>
        <Button size="small" variant="secondary">
          View details
        </Button>
      </Link>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
}

export default OrderCard;