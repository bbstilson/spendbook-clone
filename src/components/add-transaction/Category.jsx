import Icon from '../common/Icon';

import React, { PropTypes } from 'react';
import './Category.css';

const Category = ({ active, category, name, icon, onClick }) => (
  <div onClick={onClick}>
    <div key={name} className="category">
      <Icon icon={icon} category={category} active={active} />
      {name}
    </div>
  </div>
);

Category.propTypes = {
  active: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Category;
