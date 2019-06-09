import React from 'react';
import PropTypes from 'prop-types';

import WithLayoutHOC from 'app/hocs/WithLayoutHOC';

import SignUpForm from 'app/components/SignUpForm';

class SignUp extends React.Component {
  render() {
    const { signUp, connectVk } = this.props;

    return (
      <div className="page">
        <SignUpForm signUp={signUp} connectVk={connectVk} />
      </div>
    );
  };
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  connectVk: PropTypes.func.isRequired,
};

export default WithLayoutHOC(SignUp);
