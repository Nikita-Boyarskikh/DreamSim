import React from 'react';
import PropTypes from 'prop-types';

// TODO
const Loader = ({ isActive }) => (isActive ? 'Loading...' : null);

Loader.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Loader;
