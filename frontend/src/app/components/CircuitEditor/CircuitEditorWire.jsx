import React, {Component} from 'react';
import { Shape, Line, Group } from 'react-konva';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

const RADIUS = 10;

/*------------------------------------------------------------------------------
Характеристики передающиеся этому классу:
start = [el : Ключ элемента начала, pin : Ключ пина начала]
end = [el : Ключ элемента конца, pin : Ключ пина конца]
points = [0,0,...] масив смещений относительно начала
isEnded = true/false для отработки нажатия на поле редактирования
elements = Массив всех элементов на поле редактирования
------------------------------------------------------------------------------*/

class CircuitEditorWire extends React.Component {

  state = {

  };

  getPoints() {
    let lastPoints = this.props.points;
    if(this.props.end[0].el != -1){
      lastPoints.pop();
      lastPoints.pop();
      lastPoints.push(

        this.props.elements[this.props.end[0].el].x
        + this.props.elements[this.props.end[0].el].connections[this.props.end[0].pin].x
        - this.props.elements[this.props.start[0].el].x
        - this.props.elements[this.props.start[0].el].connections[this.props.start[0].pin].x
        + this.props.end[0].extraX
      );
      lastPoints.push(

        this.props.elements[this.props.end[0].el].y
        + this.props.elements[this.props.end[0].el].connections[this.props.end[0].pin].y
        - this.props.elements[this.props.start[0].el].y
        - this.props.elements[this.props.start[0].el].connections[this.props.start[0].pin].y
      );
    }
    return lastPoints;
  }

  render() {
    return (
      <Group>
      <Line
        x={this.props.elements[this.props.start[0].el].x
          + this.props.elements[this.props.start[0].el].connections[this.props.start[0].pin].x }
        y={this.props.elements[this.props.start[0].el].y
          + this.props.elements[this.props.start[0].el].connections[this.props.start[0].pin].y }
        points={this.getPoints()}
        stroke="black" />
      </Group>
    );
  }
}

export default CircuitEditorWire;
