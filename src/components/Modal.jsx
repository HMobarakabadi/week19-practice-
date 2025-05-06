import styles from "./Modal.module.css";

const Modal = ({ isOpen, onConfirm, onCancel, message }) => {
	if (!isOpen) return null;

	return (
		<div className={styles.backdrop}>
			<div className={styles.modal}>
				<p>{message}</p>
				<div className={styles.buttonGroup}>
					<button className={styles.cancel} onClick={onCancel}>
						انصراف
					</button>
					<button className={styles.confirm} onClick={onConfirm}>
						تایید
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
