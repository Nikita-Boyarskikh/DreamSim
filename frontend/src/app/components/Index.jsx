import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';

import { Provider as StoreProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import DateMomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'app/styles/theme';
import moment from 'app/lib/moment';
import { isDebug } from 'app/lib/utils';
import { subscribe } from 'app/lib/i18n';
import store from 'app/state';

import Loader from 'app/components/Loader';
import Router from 'app/components/Router';

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

export default Index;
