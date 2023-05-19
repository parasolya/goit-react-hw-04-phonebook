import PropTypes from 'prop-types';

const Filter = ({ value, changeFilter }) => {
  
  return (
    <div>
      <label>Find contacts by name   <br/>
        <input type="text" value={value} onChange={(e) => {changeFilter(e)}} />
      </label>
    </div>
    )
        
};
Filter.prototype = {
  value: PropTypes.string.isRequired,  
  changeFilter: PropTypes.func.isRequired,
};
export default Filter;
