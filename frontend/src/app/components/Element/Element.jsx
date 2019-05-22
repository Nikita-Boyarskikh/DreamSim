import React, {Component} from 'react';
import {Image, Layer} from 'react-konva';
import PropTypes from 'prop-types';
import Connection from 'Connection'

class Element extends Component {

  state = {
    isDragging: false,
    x: null,
    y: null
  };


  return (
    <Layer
      <Connection {props.x - 2} {props.y + this.props.h / 2 - 2} />
      <Connection {this.props.x + this.props.w - 2} {this.props.y + this.props.h / 2 - 2}/>
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.props.image}
        draggable
        onDragStart = { => {
          this.setState({
            isDragging: true
          });
        }}
        onDragEnd={ e => {
          this.setState({
            isDragging: false,
            x: e.target.x,
            y: e.target.y
          });
        }}
        // !!!!!!!!!!!!!!!!!
        onClick = {
        // Начать создание связи по нажатию  
        }
      />

    />
  );
};

Element.propTypes = {
  elements: PropTypes.array.isReqired
};

export default Element
