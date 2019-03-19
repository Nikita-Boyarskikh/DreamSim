import React from 'react';
import { Route, Switch, browserHistory } from 'react-router-dom';

import Main from 'app/pages/Main';
import Footer from 'app/components/Footer';
import Header from 'app/components/Header';
import NotFound from 'app/components/NotFound';

const PageNotFound = ({ history }) => (
        <React.Fragment>
          <Header
            title="Страница не найдена"
            onBackClick={() => history.goBack()}
          />
          <div className="page">
            <NotFound history={history} />
          </div>
          <Footer />
        </React.Fragment>
      ),

      Router = (props) => (
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route component={PageNotFound} />
          </Switch>
        </React.Fragment>
      );

export default Router;
