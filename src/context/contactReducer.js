const contactReducer = (state, action) => {
	switch (action.type) {
		case "ADD_CONTACT":
			return {
				...state,
				contacts: [...state.contacts, action.payload],
			};

		case "DELETE_CONTACT":
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact.id !== action.payload),
			};

		case "EDIT_CONTACT":
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact.id === action.payload.id ? { ...contact, ...action.payload } : contact
				),
			};

		case "DELETE_SELECTED":
			return {
				...state,
				contacts: state.contacts.filter((contact) => !action.payload.includes(contact.id)),
			};

		case "SET_SEARCH":
			return {
				...state,
				searchTerm: action.payload,
			};

		case "TOGGLE_SELECT":
			const id = action.payload;
			const isSelected = state.selectedContacts.includes(id);
			return {
				...state,
				selectedContacts: isSelected
					? state.selectedContacts.filter((selectedId) => selectedId !== id)
					: [...state.selectedContacts, id],
			};

		case "CLEAR_SELECTION":
			return {
				...state,
				selectedContacts: [],
			};

		case "SET_EDIT":
			return {
				...state,
				editTarget: action.payload,
			};

		case "CLEAR_EDIT":
			return {
				...state,
				editTarget: null,
			};

		default:
			return state;
	}
};

export { contactReducer };
