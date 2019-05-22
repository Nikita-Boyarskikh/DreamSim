import React, {Component} from 'react';
import { Line } from 'react-konva';
import { render } from 'react-dom';
import {Image} from 'react-konva';


const Wire = ({elements}) =>(
  <Line
    x={elements[this.props.outElementId].x + elements[this.props.outElementId].w}
    y={elements[this.props.outElementId].y + (elements[this.props.outElementId].h)/2}
    points={[ elements[this.props.inElementId].x , elements[this.props.inElementId].y + (elements[this.props.inElementId].h)/2 ]}
    stroke = "red"
    tension = {1}
    // https://codesandbox.io/s/757nw05p6  Красивые линии, но как интегрировать
  />
);
