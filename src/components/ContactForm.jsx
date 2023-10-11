import React from 'react';
import css from './App.module.css';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

const contactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'To short!')
    .max(30, 'So long!')
    .required('Required'),
  phone: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Invalid phone number format, should be 1111-11-11'
    )
    .required('Required'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const newContact = values;

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existingContact) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    dispatch(addContact(newContact));
    resetForm({ name: '', phone: '' });
  };

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      validationSchema={contactFormSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor="name" className={css.label}>
          Name
        </label>
        <br />
        <Field name="name" placeholder="Enter name" />
        <ErrorMessage name="name" component="div" className={css.error} />
        <br />
        <label htmlFor="phone" className={css.label}>
          Telephone number
        </label>
        <br />
        <Field type="tel" name="phone" placeholder="Enter number" />
        <ErrorMessage name="phone" component="div" className={css.error} />
        <br />
        <button type="submit" className={css.button_add}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
