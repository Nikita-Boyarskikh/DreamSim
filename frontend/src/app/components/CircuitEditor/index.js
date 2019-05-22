import { connect } from 'react-redux';

//import './style.scss';
import Component from './CircuitEditor';

const mapStateToProps = (state) => ({
  ...state.db.scheme
});

const mapDispatchToProps = () => ({
/*  addSchemeElement*/
});


export default connect(mapStateToProps, mapDispatchToProps)(Component);
