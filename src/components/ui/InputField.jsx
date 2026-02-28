import PropTypes from 'prop-types'
import styles from './InputField.module.css'

// Reusable text input with label and error message.
// This keeps all of our forms consistent.
export function InputField({ label, hint, error, id, type = 'text', ...rest }) {
  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {hint ? <span className={styles.hint}>{hint}</span> : null}
      </div>
      <input id={id} type={type} className={styles.input} {...rest} />
      {error ? <div className={styles.errorMessage}>{error}</div> : null}
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
}

export default InputField

