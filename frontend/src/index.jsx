import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from 'serviceWorker';
import 'app/styles/global-styles.scss';
import 'app/debug';

import Index from 'app/components/Index';

ReactDOM.render(<Index />, document.getElementById('index'));
serviceWorker.register();

// TODO: use redux-forms, redux-undo, redux-analytics, react-redux-starter-kit, reselect
