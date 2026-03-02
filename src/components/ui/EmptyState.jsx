import PropTypes from 'prop-types';
import { Button } from './Button.jsx';
import styles from './EmptyState.module.css';

// EmptyState is a friendly message for screens
// like empty cart, wishlist, or no orders yet.
export function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className={styles.root}>
      <div className={styles.illustration} />
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
      {actionLabel && onAction ? (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
}

export default EmptyState;