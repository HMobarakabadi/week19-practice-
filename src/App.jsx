import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBox from "./components/SearchBox";
import ContactProvider from "./context/ContactContext";
import styles from "./App.module.css";

function App() {
	return (
		<ContactProvider>
			<div className={styles.appContainer}>
				<h1 className={styles.title}>مدیریت مخاطبین</h1>
				<ContactForm />
				<SearchBox />
				<ContactList />
			</div>
		</ContactProvider>
	);
}

export default App;
