import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { Section } from "./Section/Section";
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

export const App = () => {
  const [contacts, setContacts] = useState([ { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');

    if (contacts) {
      setContacts(JSON.parse(contacts));
    }
  }, []);

  const addContact = event => {
    event.preventDefault();
    const form = event.target;
    const { name, number } = form.elements;

    const contact = {
      name: name.value,
      number: number.value,
      id: nanoid(),
    };

    if (contacts.find(contact => contact.name === name.value)) {
      Report.warning(
        'Phonebook Warning',
        'The contact already exists with this name',
        'Okay',
      );
      return;
    }

    setContacts(prevState => [...prevState, contact]);
    localStorage.setItem('contacts', JSON.stringify([...contacts, contact]));
    form.reset();
  };


  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
    localStorage.setItem('contacts', JSON.stringify(contacts.filter(contact => contact.id !== id)));
  };


  const inputFilter = event => {
    setFilter(event.target.value);
  };
  
  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
          <Filter value={filter} inputFilter={inputFilter} />
        <ContactList contacts={contacts} deleteContact={deleteContact} filter={filter} />
      </Section>
    </>
  );
};
