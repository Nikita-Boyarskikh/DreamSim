import React from 'react';
import PropTypes from 'prop-types';


class PageTitleHandler extends React.Component {
  componentDidMount() {
    document.title = this.props.title;
  }

  render() {
    return null;
  }
}

PageTitleHandler.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageTitleHandler;
