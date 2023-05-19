import { Component } from 'react';
import css from './Phonebook.module.css';

class ContactForm extends Component {
  
 
    state = {       
        name: '',
        number: '',
      };
   

      handleInputChange = e => {
        const { name, value } = e.currentTarget;          
        this.setState({
          [name]: value,
          
        });
      };
      
      handleContactAdd = (e) => {        
        e.preventDefault(); 
        this.props.onSubmit(this.state);
        this.reset();
      };
      reset = () => {
        this.setState({ name: '',
        number: '' })
      }
render() {
  return (
    <div>
        <form className={css.phonebook__form}  onSubmit={this.handleContactAdd}>
        <label>Name
           <input
  type="text"
  name="name"
  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required
  onChange={(e) => {this.handleInputChange(e)}}
  value={this.state.name}
/>
</label>
<label>Number
<input type="tel"
  name="number"
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
  value={this.state.number} 
  onChange={(e) => {this.handleInputChange(e)}}/>
</label>
<button className={css.submit__btn} type="submit">Submit</button>
</form>

    </div>
  );
};
};
export default ContactForm;