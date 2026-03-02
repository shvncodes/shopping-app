import PropTypes from 'prop-types';
import styles from './Badge.module.css';

// Tiny pill used to highlight categories or product tags.
export function Badge({ children, variant = 'default' }) {
  const classNames = [styles.badge];
  if (variant === 'pill') classNames.push(styles.pill);
  if (variant === 'soft') classNames.push(styles.soft);

  return <span className={classNames.join(' ')}>{children}</span>;
}

Badge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'pill', 'soft']),
}

export default Badge;