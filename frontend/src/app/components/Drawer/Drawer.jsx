import React from 'react';
import PropTypes from 'prop-types';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Menu from 'app/components/Header/Menu';

const Drawer = ({ isOpen, menuItems, onOpen, onClose }) => (
  <SwipeableDrawer onOpen={onOpen} onClose={onClose} open={isOpen}>
    <div className="drawer">
      <Menu menuItems={menuItems} />
    </div>
  </SwipeableDrawer>
);

Drawer.propTypes = {
  isOpen:  PropTypes.bool.isRequired,
  onOpen:  PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Drawer;
