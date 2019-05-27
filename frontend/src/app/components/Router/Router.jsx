import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from 'app/pages/Main';
import Login from 'app/pages/Login';
import PageNotFound from 'app/pages/NotFound';
import Editor from  'app/pages/Editor'

PageNotFound.propTypes = {
  history: PropTypes.object.isRequired,
};

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/editor" component={Editor} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
