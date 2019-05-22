import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Element from 'Element'
import { Stage, Layer} from 'react-konva';
import {Scroll} from 'react-scroll-component';

const LeftMenu = ({backendElements}) => (
  <Scroll>
    <Stage width={window.innerWidth} height={window.innerHeight} > //??? razmeri
      <Layer>
        {backendElements.map(element => <Element key={element.id} image={element.image} x={elements.x} y={elements.y} w={element.w} h={element.h} {...element} />)}

        onClick = {
          // добавление
        }
      </Layer>
    </Stage>
  </Scroll>
);
