import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './Icon.css';

function getClassnames (icon, category, active) {
  return classnames(icon, category.toLowerCase(), 'category-icon', 'fa', 'fa-lg', { active });
}

const Icon = ({ icon, category, active }) => (
  <span className={getClassnames(icon, category, active)} />
);

Icon.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default Icon;
