import React from 'react';
import PropTypes from 'prop-types';

import WithLayoutHOC from 'app/hocs/WithLayoutHOC';

import NotFound from 'app/components/NotFound';

const PageNotFound = ({ history }) => (
  <div className="page">
    <NotFound history={history} />
  </div>
);

PageNotFound.propTypes = {
  history: PropTypes.object.isRequired,
};

export default WithLayoutHOC(PageNotFound);
