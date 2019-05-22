import React from 'react';
import { render } from 'react-dom';
import {Circle} from 'react-konva';
import PropTypes from 'prop-types';

const Connection = ({pos_x,pos_y}) = > (
  <Circle x = {pos_x} y = {pos_y} radius = {4} fill = "black" />
);

export default Connection
