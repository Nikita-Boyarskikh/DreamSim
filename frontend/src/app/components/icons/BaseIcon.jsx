import React from 'react';
import * as PropTypes from 'prop-types';

const BaseIcon = ({ icon, ...rest }) => (
  <svg {...rest} >
    <use href={`#${icon.id}`} viewBox={icon.viewBox} />
  </svg>
);

BaseIcon.propTypes = {
  icon: PropTypes.shape({
    id: PropTypes.string.isRequired,
    viewBox: PropTypes.string.isRequired,
  })
};

export default BaseIcon;
