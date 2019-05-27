import React from 'react';
import { render } from 'react-dom';
import {Circle} from 'react-konva';
import PropTypes from 'prop-types';

class CircuitEditorConnection extends React.Component{

  handleClick = () => {
    this.props.onPinClick();
    console.log("Нажат (уровень 0)");
  }

  handleUp = () => {
    this.props.onPinUp();
    console.log("Отпущен уровень 0");
  }

  render(){
    return(
      <Circle x = {this.props.pos_x} y = {this.props.pos_y} radius = {5} fill = "black"
        onMouseDown = {this.handleClick}
        onMouseUp = {this.handleUp}
      />
    );
  }
}

export default CircuitEditorConnection;
