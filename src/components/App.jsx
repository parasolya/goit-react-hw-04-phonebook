import { Component } from 'react';
import React from 'react';
import ContactForm from './Phonebook/ContactForm';
import { nanoid } from 'nanoid';
import Filter from './Phonebook/Filter';
import ContactList from './Phonebook/ContactList';
import css from '././Phonebook/Phonebook.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  };

  componentDidUpdate( _, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };
  
  formSubmitHandler = data => {
    const { contacts } = this.state;
    const sameName = contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (sameName) return alert(sameName.name + ' is already in contacts.');

    const sameNumber = contacts.find(
      el => el.number.toLowerCase() === data.number.toLowerCase()
    );
    if (sameNumber)
      return alert(sameNumber.number + ' is already in contacts.');

    data.id = nanoid();

    this.setState(prevState => ({ contacts: [ data, ...prevState.contacts ] }));
  };
  handleChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  visibleContacts = () => {
    const { filter, contacts } = this.state;

    const visible = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return visible;
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    return (
      <div className={css.phonebook__section}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>

        <Filter value={filter} changeFilter={this.handleChangeFilter} />
        {contacts.length ? (
          <ContactList
            contacts={this.visibleContacts()}
            onDelete={this.deleteContacts}
          />
        ) : (
          <p>No any contacts</p>
        )}
      </div>
    );
  }
};

export default App;
