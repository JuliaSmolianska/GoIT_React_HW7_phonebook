import { AiFillDelete } from 'react-icons/ai';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };
  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name} - {contact.phone}
          <button
            className={css.button_delete}
            onClick={() => handleDelete(contact.id)}
          >
            {' '}
            <AiFillDelete />
          </button>
        </li>
      ))}
    </ul>
  );
};
