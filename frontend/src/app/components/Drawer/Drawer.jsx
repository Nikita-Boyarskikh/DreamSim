import React from 'react';
import PropTypes from 'prop-types';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const Drawer = ({ isOpen, onOpen, onClose }) => (
  <SwipeableDrawer onOpen={onOpen} onClose={onClose} open={isOpen} />
);

Drawer.propTypes = {
  isOpen:  PropTypes.bool.isRequired,
  onOpen:  PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Drawer;
