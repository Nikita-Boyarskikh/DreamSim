import React from 'react';
import { Typography } from '@material-ui/core';

import SchemeCatalogScheme from './SchemeCatalogScheme';

const SchemeCatalog = ({ t: _, scheme }) => (
  <div className="scheme-catalog">
    <Typography variant="h1">
      {_('Scheme catalog')}
    </Typography>

    <div className="scheme-catalog__scheme-list">
      {scheme.ids.length === 0 && <Typography variant="h2">{_('There is nothing here yet...')}</Typography> }
      {scheme.ids.map(schemeId => <SchemeCatalogScheme {...scheme.entities[schemeId]} />)}
    </div>
  </div>
);

SchemeCatalog.propTypes = {};

export default SchemeCatalog;
