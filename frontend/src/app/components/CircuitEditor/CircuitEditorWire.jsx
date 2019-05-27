import React, {Component} from 'react';
import { Shape, Line, Group } from 'react-konva';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

const RADIUS = 10;

class CircuitEditorWire extends React.Component {

  render() {
    return (
      <Group>
      <Line x={this.props.points[0].x} y={this.props.points[0].y}
        points={[0, 0, this.props.points[1].x - this.props.points[0].x, this.props.points[1].y - this.props.points[0].y]}
        stroke="black" />
      </Group>
    );
  }
}

export default CircuitEditorWire;
