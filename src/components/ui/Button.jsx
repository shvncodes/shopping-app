import PropTypes from 'prop-types'
import styles from './Button.module.css'

// Reusable button component so that all buttons
// share the same rounded, girly look.
export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  size = 'normal',
  disabled = false,
  ...rest
}) {
  const classNames = [styles.button]

  if (variant && styles[variant]) classNames.push(styles[variant])
  if (fullWidth) classNames.push(styles.fullWidth)
  if (size === 'small') classNames.push(styles.small)
  if (disabled) classNames.push(styles.disabled)
                       
  return (
    <button className={classNames.join(' ')} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['normal', 'small']),
  disabled: PropTypes.bool,
}

export default Button

