import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import ContactItem from "./ContactItem";
import Modal from "./Modal";

import styles from "./ContactList.module.css";

const ContactList = () => {
	const { contacts, searchTerm } = useContext(ContactContext);
	const { dispatch, selectedContacts } = useContext(ContactContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalAction, setModalAction] = useState(() => () => {});
	const [modalMessage, setModalMessage] = useState("");

	const filtered = contacts.filter((contact) =>
		[contact.firstName, contact.lastName, contact.email].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (contacts.length === 0) {
		return <p>هیچ مخاطبی موجود نیست.</p>;
	}

	const handleBulkDelete = () => {
		openModal("آیا از حذف مخاطبین انتخاب‌شده مطمئن هستید؟", () => {
			dispatch({ type: "DELETE_SELECTED", payload: selectedContacts });
			dispatch({ type: "CLEAR_SELECTION" });
		});
	};

	const openModal = (message, action) => {
		setModalMessage(message);
		setModalAction(() => action);
		setIsModalOpen(true);
	};

	const handleConfirm = () => {
		modalAction();
		setIsModalOpen(false);
	};

	return (
		<div className={styles.contactList}>
			{selectedContacts.length > 0 && (
				<button onClick={handleBulkDelete} className={styles.bulkDeleteButton}>
					حذف مخاطبین انتخاب‌شده ({selectedContacts.length})
				</button>
			)}

			{filtered.map((contact) => (
				<ContactItem key={contact.id} contact={contact} />
			))}

			<Modal
				isOpen={isModalOpen}
				onConfirm={handleConfirm}
				onCancel={() => setIsModalOpen(false)}
				message={modalMessage}
			/>
		</div>
	);
};

export default ContactList;
