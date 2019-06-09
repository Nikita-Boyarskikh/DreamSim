import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

import { AUTO_HIDE_SNACKBAR } from 'app/constants/view';
import { closeAlert } from 'app/state/actions/ui';
import { getBackRef } from 'app/lib/navigation';
import Header from 'app/components/Header';

const checkGoBack = (history) => {
  const backRef = getBackRef(history);
  if (backRef) {
    return () => history.push(backRef);
  }

  return history.location.pathname === '/' ? null : () => history.goBack();
};

const WithLayoutHOC = (Component) => {
  const historyPropTypes = {
    history: PropTypes.object.isRequired,
  };

  const alertPropTypes = {
    alert: PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string
    }),
    closeAlert: PropTypes.func
  };

  Component.propTypes = {
    ...historyPropTypes,
    ...Component.propTypes,
  };

  const alertIcons = {
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    success: <SuccessIcon />,
    info: <InfoIcon />
  };

  const Layout = (props) => (
    <React.Fragment>
      <Header history={props.history} onBackClick={checkGoBack(props.history)} {...props} />
      {props.alert && <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={Boolean(props.alert.message)}
        onClose={props.closeAlert}
        autoHideDuration={AUTO_HIDE_SNACKBAR}
      >
        <SnackbarContent
          className={`alert alert_${props.alert.type}`}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar">
              {alertIcons[props.alert.type]}
              {props.alert.message}
            </span>
          }
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={props.closeAlert}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </Snackbar>}
      <Component {...props} />
    </React.Fragment>
  );

  Layout.propTypes = {
    ...alertPropTypes,
    ...historyPropTypes,
    ...Header.propTypes,
    ...Component.propTypes,
  };

  const mapStateToProps = state => ({
    alert: state.local.ui.alert
  });
  const mapDispatchToProps = dispatch => ({
    closeAlert: () => dispatch(closeAlert())
  });

  return connect(mapStateToProps, mapDispatchToProps)(Layout);
};

export default WithLayoutHOC;
