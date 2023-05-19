import PropTypes from 'prop-types';
import css from './Phonebook.module.css';

const ContactList = ({ contacts, onDelete }) => {
   
    return (
      <div>
          <ul>
        {contacts.map(el => {
          
          return (
              <li className={css.contacts__item} key={el.id}>
            <p>
              {el.name}: <span>{el.number}</span>
            </p>
            <button className={css.contacts__btn} onClick={() => onDelete(el.id)}>delete</button>
            </li>
          );
        })}
        </ul>
      </div>
    );
  };
  ContactList.prototype = {
    contacts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  export default ContactList;