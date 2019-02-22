import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { autoRehydrate, persistStore } from 'redux-persist';

import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';
import 'app/styles/global-styles.scss';
import theme from 'app/styles/theme.js';

import 'app/config.js';
import configureStore from 'app/state/store/configureStore';
import * as serviceWorker from 'serviceWorker';

import Router from 'app/components/Router';

// TODO: use autoRehydrate???
const store = configureStore(autoRehydrate());

persistStore(store);

const Index = () => (
  <StoreProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MuiThemeProvider>
  </StoreProvider>
);

ReactDOM.render(Index, document.getElementById('index'));
serviceWorker.register();

// TODO: use redux-forms, react-redux-router, redux-thunk, redux-undo, redux-analytics, react-redux-starter-kit, reselect
