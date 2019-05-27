import { connect } from 'react-redux';

import Component from './CircuitEditor';

const mapStateToProps = (state) => ({
  ...state.db.scheme
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
