import React from 'react';
import PropTypes from 'prop-types';
import { Link as Rote } from 'react-router-dom';
import { Trans } from 'react-i18next';
import moment from 'moment';

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
} from '@material-ui/core';

import urls from 'app/constants/urls';

import IconLogo from 'app/components/icons/IconLogo';
import IconLogoVk from 'app/components/icons/IconLogoVk';
import { KeyboardDatePicker } from '@material-ui/pickers';

class SignUpForm extends React.Component {
  state = {
    login: '',
    name: '',
    surname: '',
    email: '',
    group: '',
    birthday: moment(),
    patronymic: '',
    password1: '',
    password2: '',
    showPassword1: false,
    showPassword2: false,
  };

  togglePassword1Visibility = () => {
    this.setState(prevState => ({
      showPassword1: !prevState.showPassword1
    }));
  };

  togglePassword2Visibility = () => {
    this.setState(prevState => ({
      showPassword2: !prevState.showPassword2
    }));
  };

  onSubmit(event) {
    event.preventDefault();

    this.props.signUp({
      username: this.state.login,
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      group: this.state.group,
      birthday: this.state.birthday.format('DD-MM-YYYY'),
      patronymic: this.state.patronymic,
      password1: this.state.password1,
      password2: this.state.password2,
    })
  }

  render() {
    const { t: _, connectVk } = this.props;

    return (
      <form
        onSubmit={event => this.onSubmit(event)}
        className="signup"
      >
        <div className="form-line">
          <IconLogo className="icon signup__icon"/>
        </div>

        <div className="form-line">
          <Typography className="signup__title" variant="h1" gutterBottom>
            { _('Create account DreamSim!') }
          </Typography>

          <Typography className="signup__login">
            { _('Already registered?') }
            <Link
              component={Rote}
              className="signup__login-link"
              to={urls.login}
            >
              { _('Log in') }
            </Link>
          </Typography>
        </div>

        <div className="form-line">
          <TextField
            label={ _('Login') }
            name="username"
            value={this.state.login}
            onChange={event => this.setState({ login: event.target.value })}
            className="form-line signup__login"
            fullWidth
            autoComplete="login"
            required
            autoFocus
          />
        </div>

        <div className="form-line">
          <TextField
            label={ _('Name') }
            name="name"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            className="form-line signup__name"
            autoComplete="name"
            fullWidth
            required
          />
        </div>

        <div className="form-line">
          <TextField
            label={ _('Surname') }
            name="surname"
            value={this.state.surname}
            onChange={event => this.setState({ surname: event.target.value })}
            className="form-line signup__surname"
            autoComplete="surname"
            fullWidth
            required
          />
        </div>

        <div className="form-line">
          <TextField
            label={ _('Patronymic') }
            name="patronymic"
            value={this.state.patronymic}
            onChange={event => this.setState({ patronymic: event.target.value })}
            className="form-line signup__patronymic"
            autoComplete="patronymic"
            fullWidth
          />
        </div>

        <div className="form-line">
          <TextField
            label={ _('Email') }
            name="email"
            type="email"
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
            className="form-line signup__email"
            autoComplete="email"
            fullWidth
            required
          />
        </div>

        <div className="form-line">
          <TextField
            label={ _('Group') }
            name="group"
            value={this.state.group}
            onChange={event => this.setState({ group: event.target.value })}
            className="form-line signup__group"
            autoComplete="group"
            fullWidth
          />
        </div>

        <div className="form-line">
          <TextField
            label={ _('Password') }
            className="form-line signup__password"
            type={this.state.showPassword1 ? 'text' : 'password'}
            value={this.state.password1}
            onChange={event => this.setState({ password1: event.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={this.togglePassword1Visibility} color="primary">
                    {this.state.showPassword1 ? <IconVisibility/> : <IconVisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
            autoComplete="password"
            fullWidth
            required
          />
        </div>

        <div className="form-line">
          <TextField
            label={ _('Repeat password') }
            className="form-line signup__password"
            type={this.state.showPassword2 ? 'text' : 'password'}
            value={this.state.password2}
            onChange={event => this.setState({ password2: event.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={this.togglePassword2Visibility} color="primary">
                    {this.state.showPassword2 ? <IconVisibility/> : <IconVisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
            autoComplete="password"
            fullWidth
            required
          />
        </div>

        <div className="form-line">
          <KeyboardDatePicker
            value={this.state.birthday}
            onChange={value => this.setState({ birthday: value })}
            disableFuture
            minDate={moment('01-01-1900', 'DD-MM-YYYY')}
            label={ _('Birthday') }
            format="DD.MM.YYYY"
            refuse={/[^\d]+/g}
            className="form-line signup__birthday"
            fullWidth
          />
        </div>

        {/*<div className="form-line">*/}
        {/*  <div className="signup__accept-user-agreement">*/}
        {/*    <FormControlLabel*/}
        {/*      control={<Checkbox color="primary" />}*/}
        {/*      label={*/}
        {/*        <Trans>*/}
        {/*          I accept the&nbsp;*/}
        {/*          <Link*/}
        {/*            to={urls.userAgreement}*/}
        {/*            component={Rote}*/}
        {/*          >*/}
        {/*            user agreement*/}
        {/*          </Link>*/}
        {/*        </Trans>}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="form-line">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            { _('Sign up') }
          </Button>
        </div>

        {/*<Button*/}
        {/*  onClick={connectVk}*/}
        {/*  variant="text"*/}
        {/*  fullWidth*/}
        {/*>*/}
        {/*  <IconLogoVk className="signup__vk-icon" />*/}
        {/*  { _('Sign up with VKontakte') }*/}
        {/*</Button>*/}
      </form>
    );
  };
}

SignUpForm.propTypes = {
  signUp: PropTypes.func.isRequired,
  connectVk: PropTypes.func.isRequired,
};

export default SignUpForm;
