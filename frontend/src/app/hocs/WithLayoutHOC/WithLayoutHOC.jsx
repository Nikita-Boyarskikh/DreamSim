import React from 'react';
import PropTypes from 'prop-types';

import Header from 'app/components/Header';

const WithLayoutHOC = (Component) => {
  const historyPropTypes = {
    history: PropTypes.object.isRequired,
  };

  Component.propTypes = {
    ...historyPropTypes,
    ...Component.propTypes,
  };

  const Layout = (props) => (
    <React.Fragment>
      <Header onBackClick={() => props.history.goBack()} {...props} />
      <Component {...props} />
    </React.Fragment>
  );

  Layout.propTypes = {
    ...historyPropTypes,
    ...Header.propTypes,
    ...Component.propTypes,
  };

  return Layout;
};

export default WithLayoutHOC;
