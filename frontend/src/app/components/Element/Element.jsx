import React, {Component} from 'react';
import {Image, Layer} from 'react-konva';
import PropTypes from 'prop-types';
import Connection from '../Connection'

class Element extends Component {

  state = {
    isDragging: false,
    x: null,
    y: null
  };

  render() {
  return (
    <Layer>
      <Connection pos_x = {this.props.x - 2} pos_y = {this.props.y + this.props.h / 2 - 2} />
      <Connection pos_x = {this.props.x + this.props.w - 2} pos_y={this.props.y + this.props.h / 2 - 2}/>
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.props.image}
        draggable
        onDragStart = {() => {
          this.setState({
            isDragging: true
          });
        }}
        onDragEnd={ (e) => {
          this.setState({
            isDragging: false,
            x: e.target.x,
            y: e.target.y
          });
        }}
        // !!!!!!!!!!!!!!!!!
        onClick = {
          ()=>{}
        // Начать создание связи по нажатию
        }
      />

    </Layer>
  );
}
};

Element.propTypes = {
  elements: PropTypes.array.isReqired
};

export default Element
