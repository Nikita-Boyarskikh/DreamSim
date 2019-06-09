import React from 'react';
import { Route, Switch } from 'react-router-dom';

import urls from 'app/constants/urls';
import { history } from 'app/state/store/configureStore';
import { ConnectedRouter } from 'connected-react-router';

import Main from 'app/pages/Main';
import Login from 'app/pages/Login';
import PageNotFound from 'app/pages/NotFound';
import Editor from  'app/pages/Editor';
import SignUp from 'app/pages/SingUp';

const Router = (props) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={urls.root} component={Main} />
      <Route exact path={urls.login} component={Login} />
      <Route exact path={urls.editor} component={Editor} />
      <Route exact path={urls.signup} component={SignUp} />
      <Route component={PageNotFound} />
    </Switch>
  </ConnectedRouter>
);

export default Router;
