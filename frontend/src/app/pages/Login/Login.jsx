import React from 'react';
import PropTypes from 'prop-types';

import WithLayoutHOC from 'app/hocs/WithLayoutHOC';

import LoginForm from 'app/components/LoginForm';

class Login extends React.Component {
  render() {
    const { t: _, login, loginWithVk } = this.props;

    return (
      <div className="page">
        <LoginForm login={login} loginWithVk={loginWithVk} />
      </div>
    );
  };
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginWithVk: PropTypes.func.isRequired,
};

export default WithLayoutHOC(Login);
