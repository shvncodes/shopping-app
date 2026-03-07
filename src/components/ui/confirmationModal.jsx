import PropTypes from "prop-types";
import styles from "./confirmationModal.module.css";

export function ConfirmationModal({
    isShow = false,
    title,
    description,
    onConfirm,
    confirmMessage = "Yes",
    onCancel,
    cancelMessage = "Cancel"
}) {

    if (!isShow) return null;

    return (
        <div className={styles.main}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <p className={styles.title}>{title}</p>
                    <button className={styles.exit} onClick={onCancel}>
                        X
                    </button>
                </div>

                <p className={styles.description}>{description}</p>

                <div className={styles.buttons}>
                    <button className={styles.confirm} onClick={onConfirm}>
                        {confirmMessage}
                    </button>

                    <button className={styles.cancel} onClick={onCancel}>
                        {cancelMessage}
                    </button>
                </div>

            </div>
        </div>
    );
}

ConfirmationModal.propTypes = {
    isShow: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    onConfirm: PropTypes.func,
    confirmMessage: PropTypes.string,
    onCancel: PropTypes.func,
    cancelMessage: PropTypes.string
};

export default ConfirmationModal;