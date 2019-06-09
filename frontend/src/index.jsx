import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { hot } from 'react-hot-loader/root';
import DateMomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';
import 'app/styles/global-styles.scss';
import theme from 'app/styles/theme.js';

import 'app/debug';
import { isDebug } from 'app/lib/utils';

import * as serviceWorker from 'serviceWorker';
import moment from 'app/lib/moment';
import { subscribe } from 'app/lib/i18n';
import store from 'app/state';

import Router from 'app/components/Router';
import Loader from 'app/components/Loader';

subscribe(store);
const persistor = persistStore(store);

let Index = () => (
  <StoreProvider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateMomentUtils} libInstance={moment}>
          <CssBaseline />
          <Suspense fallback={<Loader />}>
            <Router />
          </Suspense>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </PersistGate>
  </StoreProvider>
);

if (isDebug) {
  Index = hot(Index);
}

ReactDOM.render(<Index />, document.getElementById('index'));
serviceWorker.register();

// TODO: use redux-forms, redux-undo, redux-analytics, react-redux-starter-kit, reselect
export default Index;
