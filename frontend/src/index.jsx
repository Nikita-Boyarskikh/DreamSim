import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';
import 'app/styles/global-styles.scss';
import theme from 'app/styles/theme.js';

import 'app/debug';
import 'app/lib/i18n';
import 'app/lib/moment';

import configureStore from 'app/state/store/configureStore';
import * as serviceWorker from 'serviceWorker';

import Router from 'app/components/Router';
import Loader from 'app/components/Loader';

const store = configureStore();
const persistor = persistStore(store);

const Index = () => (
  <StoreProvider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loader />}>
          <Router />
        </Suspense>
      </MuiThemeProvider>
    </PersistGate>
  </StoreProvider>
);

ReactDOM.render(<Index />, document.getElementById('index'));
serviceWorker.register();

/*
 * TODO: use redux-forms, react-redux-router, normalizr,
 * redux-thunk, redux-undo, redux-analytics, react-redux-starter-kit, reselect
 */

export default Index;
