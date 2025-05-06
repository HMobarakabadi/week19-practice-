import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
	const { searchTerm, dispatch } = useContext(ContactContext);

	const handleChange = (e) => {
		dispatch({ type: "SET_SEARCH", payload: e.target.value });
	};

	return (
		<input
			type="text"
			placeholder="جستجو بر اساس نام، نام خانوادگی یا ایمیل..."
			value={searchTerm}
			onChange={handleChange}
			className={styles.searchBox}
		/>
	);
};

export default SearchBox;
