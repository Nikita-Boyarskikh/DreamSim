import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const NotFound = ({ history }) => (
  <Card square className="card not-found">
    <CardHeader title="Страница не найдена" />
    <CardMedia component="img" image="/static/images/notFound.png" title="not_found" className="not_found" />
    <CardActions>
      <Button color="primary" fullWidth onClick={() => history.goBack()}>Назад</Button>
    </CardActions>
  </Card>
);

export default NotFound;
