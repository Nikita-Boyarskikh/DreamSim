import React from 'react';
import PropTypes from 'prop-types';
import { Link as Rote } from 'react-router-dom';

import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Link
} from "@material-ui/core";

import urls from 'app/constants/urls';

import IconLogo from 'app/components/icons/IconLogo';
import IconLogoVk from 'app/components/icons/IconLogoVk';

class LoginForm extends React.Component {
  state = {
    showPassword: false
  };

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  render() {
    const { t: _, login, loginWithVk } = this.props;

    return (
      <form
        action={urls.api.v1.login}
        className="login"
      >
        <div className="form-line">
          <IconLogo className="icon login__icon"/>
        </div>

        <div className="form-line">
          <Typography className="login__title" variant="h1" gutterBottom>
            { _('Enter to continue') }
          </Typography>

          <Typography className="login__register">
            { _('You have no account?') }
            <Link
              component={Rote}
              className="login__register-link"
              to={urls.signup}
            >
              { _('Please, register') }
            </Link>
          </Typography>
        </div>

        <div className="form-line">
          <TextField
            label={ _('Login (email)') }
            type="email"
            name="login"
            className="form-line login__login"
            fullWidth
            required
            autoFocus
          />

          <TextField
            label={ _('Password') }
            className="form-line login__password"
            type={this.state.showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={this.togglePasswordVisibility} color="primary">
                    {this.state.showPassword ? <IconVisibility/> : <IconVisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
            fullWidth
            required
          />

          {/*<div className="login__reset-password">*/}
          {/*  <FormControlLabel*/}
          {/*    control={<Checkbox color="primary" />}*/}
          {/*    label={_('Remember password')}*/}
          {/*  />*/}
          {/*  <Typography>*/}
          {/*    <Link*/}
          {/*      className="login__reset-password-link"*/}
          {/*      to={urls.resetPassword}*/}
          {/*      component={Rote}*/}
          {/*    >*/}
          {/*      { _('Forgot your password?') }*/}
          {/*    </Link>*/}
          {/*  </Typography>*/}
          {/*</div>*/}
        </div>

        <div className="form-line">
          <Button
            type="submit"
            onSubmit={login}
            fullWidth
            variant="contained"
            color="primary"
          >
            { _('Log in') }
          </Button>
        </div>

        {/*<Button*/}
        {/*  onClick={loginWithVk}*/}
        {/*  variant="text"*/}
        {/*  fullWidth*/}
        {/*>*/}
        {/*  <IconLogoVk className="login__login-vk-icon" />*/}
        {/*  { _('Login with VKontakte') }*/}
        {/*</Button>*/}
      </form>
    );
  };
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  loginWithVk: PropTypes.func.isRequired,
};

export default LoginForm;
