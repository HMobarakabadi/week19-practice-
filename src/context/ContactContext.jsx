import { createContext, useReducer } from "react";
import { contactReducer } from "./contactReducer";

const ContactContext = createContext();

const initialState = {
	contacts: [],
	searchTerm: "",
	selectedContacts: [],
	editTarget: null,
};

const ContactProvider = ({ children }) => {
	const [state, dispatch] = useReducer(contactReducer, initialState);

	return <ContactContext.Provider value={{ ...state, dispatch }}>{children}</ContactContext.Provider>;
};

export default ContactProvider;
export { ContactContext };
