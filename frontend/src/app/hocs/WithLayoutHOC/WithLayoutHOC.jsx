import React from 'react';
import PropTypes from 'prop-types';

import { getBackRef } from 'app/lib/navigation';
import Header from 'app/components/Header';

const checkGoBack = (history) => {
  const backRef = getBackRef(history);
  if (backRef) {
    return () => history.push(backRef);
  }

  return history.location.pathname === '/' ? null : () => history.goBack();
};

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
      <Header history={props.history} onBackClick={checkGoBack(props.history)} {...props} />
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
