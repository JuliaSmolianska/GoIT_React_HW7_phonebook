import { ContactForm } from './ContactForm';
import { SearchFilter } from './SearchFilter';
import { ContactList } from './ContactList';
import css from './App.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectError } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

export function App() {
  const dispatch = useDispatch();
  
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.box}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h1>Contacts</h1>
      <SearchFilter />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ContactList />
    </div>
  );
}
