import PropTypes from "prop-types";
import style from './Filter.module.css';

export const Filter = ({ value, inputFilter }) => (
   
        <label className={style.name}>
            Find contacts by name
            <input className={style.input} type='text' value={value} onChange={inputFilter} />
        </label>
);

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

