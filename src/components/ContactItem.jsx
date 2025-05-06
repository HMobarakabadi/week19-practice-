import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import styles from "./ContactItem.module.css";

const ContactItem = ({ contact }) => {
	const { dispatch, selectedContacts } = useContext(ContactContext);

	const isChecked = selectedContacts.includes(contact.id);

	const handleDelete = () => {
		if (window.confirm("آیا از حذف این مخاطب مطمئن هستید؟")) {
			dispatch({ type: "DELETE_CONTACT", payload: contact.id });
		}
	};

	const handleCheck = () => {
		dispatch({ type: "TOGGLE_SELECT", payload: contact.id });
	};

	const handleEdit = () => {
		dispatch({ type: "SET_EDIT", payload: contact });
	};

	return (
		<div className={styles.contactItem}>
			<div className="flex items-center gap-4">
				<input type="checkbox" checked={isChecked} onChange={handleCheck} className={styles.contactItemCheckbox} />
				<div className={styles.contactItemInfo}>
					{" "}
					<p className="font-bold">
						{contact.firstName} {contact.lastName}
					</p>
					<p>{contact.email}</p>
					<p>{contact.phone}</p>
				</div>
				<div className={styles.contactItemActions}>
					{" "}
					<button onClick={handleDelete} className={`${styles.contactItemButton} ${styles.contactItemButtonDelete}`}>
						حذف
					</button>
					<button onClick={handleEdit} className={`${styles.contactItemButton} ${styles.contactItemButtonEdit}`}>
						ویرایش
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContactItem;
