import React from 'react';
import CircuitEditorElement from './CircuitEditorElement';
import { Layer } from 'react-konva';
import uuid from 'uuid';


class CircuitEditor extends React.Component {

  state = {
    connectClicked:false,
    upOnConnect:false,
    elementStopped : [],
    flagStopped : false
  };

/*------------------------------------------------------------------------------
Отработка нажатия на соединение
------------------------------------------------------------------------------*/
  pinClick = (pin) => {
    console.log("Кликнуто соединение (3)");
    this.props.onPinClick(pin);
  };

  elementStopped = (arr) => {
    console.log("Конец перетаскивания (2)");
    this.props.onStop(arr);
  };

  render(){
    return(
      <Layer>
        {this.props.elements.map(element => <CircuitEditorElement
          key={uuid.v4()} selfKey = {element.selfKey} id = {element.id}
          image={element.image}
          x={element.x} y={element.y}
          connections={element.connections}
          onPinClick={(pin) => this.pinClick(pin)}
          onStop = {(arr) => this.elementStopped(arr)}
          />
      )}
      </Layer>
    );
  }
}


export default CircuitEditor
