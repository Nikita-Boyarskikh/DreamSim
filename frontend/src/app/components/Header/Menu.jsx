import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Menu = ({ menuItems }) => (
  <React.Component>
    {menuItems.map((item, i) => (
      <IconButton key={i} component={Link} to={item.url}>
        <Typography variant="h6" component="h1">{item.name}</Typography>
      </IconButton>
    ))}
  </React.Component>
);

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url:  PropTypes.string,
  })),
};

export default Menu;
