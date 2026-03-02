import PropTypes from 'prop-types';
import styles from './Card.module.css';

// Simple reusable card container.
// This keeps backgrounds, radius and shadow
// consistent across the whole app.
export function Card({ children, subtle = false, clickable = false, ...rest }) {
  const classNames = [styles.card];
  if (subtle) classNames.push(styles.subtle);
  if (clickable) classNames.push(styles.clickable);

  return (
    <div className={classNames.join(' ')} {...rest}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  subtle: PropTypes.bool,
  clickable: PropTypes.bool,
}

export default Card;