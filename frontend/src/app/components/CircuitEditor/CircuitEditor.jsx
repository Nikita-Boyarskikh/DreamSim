import React, {Component} from 'react';
import { render } from 'react-dom';
import { Stage, Layer} from 'react-konva';
import Element from '../Element';
import Wire from '../Wire';

import PropTypes from 'prop-types';


const CircuitEditor = ({elements, wires}) => (
  <Stage width={window.innerWidth} height={window.innerHeight} >   //??? razmeri
    <Layer>
      {elements.map(element => <Element key={element.id} image={element.image} x={elements.x} y={elements.y} w={element.w} h={element.h} {...element} />)}
      {wires.map(element => <Wire key={wires.id} inElementId={wire.inElementId} outElementId={wire.outElementId} {...wires} />)}
      onClick = {
        // добавление элементов, если они выбраны в левом меню
      }
    </Layer>
  </Stage>
);

CircuitEditor.propTypes = {
  elements:  PropTypes.array.isRequired,
  wires: PropTypes.array.isReqired
};


/*

class CircuitEditor extend Component

  const elementsArray = [];

  const wiresArray = [];

  render() {
    return (
      <Stage>
        <Layer>
          {elementsArray}
          {wiresArray}
        </Layer>
      </Stage>

    );
  }

);
*/

export default Circuit_Editor
