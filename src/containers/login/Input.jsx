import React, { PropTypes } from 'react';

const Input = ({ classes, type, placeholder, value, onChange }) => (
  <input className={classes} type={type} name={type} placeholder={placeholder} value={value} onChange={onChange} />
);

Input.propTypes = {
  classes: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
