import React from 'react';
import { Link } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import SchemeCatalog from 'app/components/SchemeCatalog';
import WithLayoutHOC from 'app/hocs/WithLayoutHOC';
import urls from 'app/constants/urls';

const Main = () => (
  <div className="main page">
    <SchemeCatalog />
    <Fab aria-label="Create scheme" className="main__add-scheme" color="primary" component={Link} to={urls.editor}>
      <AddIcon />
    </Fab>
  </div>
);

export default WithLayoutHOC(Main);
