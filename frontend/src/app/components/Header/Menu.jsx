import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const Menu = ({ menuItems, t: _ }) => (
  <div className="menu">
    {menuItems.map((item, i) => (
      <IconButton key={i} component={Link} to={item.url} className="menu__item">
        <Typography variant="h6" component="h1" className="header__element menu__item-name">
          {_(item.name)}
        </Typography>
      </IconButton>
    ))}
  </div>
);

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    url:  PropTypes.string,
  })),
};

export default withTranslation()(Menu);
