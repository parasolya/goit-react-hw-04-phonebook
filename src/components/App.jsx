import { useState, useEffect } from 'react';
import React from 'react';
import ContactForm from './Phonebook/ContactForm';
import { nanoid } from 'nanoid';
import Filter from './Phonebook/Filter';
import ContactList from './Phonebook/ContactList';
import css from '././Phonebook/Phonebook.module.css';

function App() {
  const startContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? startContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    data.id = nanoid();

    const sameName = contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (sameName) return alert(sameName.name + ' is already in contacts.');

    const sameNumber = contacts.find(
      el => el.number.toLowerCase() === data.number.toLowerCase()
    );
    if (sameNumber)
      return alert(sameNumber.number + ' is already in contacts.');

    setContacts([data, ...contacts]);
  };

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const visibleContacts = () => {
    const visible = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return visible;
  };

  const deleteContacts = id => {
    const updateArray = contacts.filter(contact => contact.id !== id);
    setContacts(updateArray);
  };

  return (
    <div className={css.phonebook__section}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>

      <Filter value={filter} changeFilter={handleChangeFilter} />
      {contacts.length ? (
        <ContactList contacts={visibleContacts()} onDelete={deleteContacts} />
      ) : (
        <p>No any contacts</p>
      )}
    </div>
  );
}

export default App;
