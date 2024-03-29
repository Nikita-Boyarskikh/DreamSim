import React from 'react';
import { render } from 'react-dom';
import {Line,Rect,Group,Circle} from 'react-konva';
import PropTypes from 'prop-types';

class CircuitEditorConnection extends React.Component{

  state = {
    selfKey : this.props.selfKey
  };

/*------------------------------------------------------------------------------
Обработка нажатия на соединение - передача его id выше
------------------------------------------------------------------------------*/
  handleClick = () => {
    console.log("Кликнуто соединение (1)");
    this.props.onPinClick(this.state.selfKey);
  }

  render(){
    return(
      <Group>
        <Rect x = {this.props.pos_x} y = {this.props.pos_y - 10} width = {20} height = {20} fill = "white"
          onClick = {this.handleClick}/>
        <Line x = {this.props.pos_x} y = {this.props.pos_y} points = {[0,0,20,0]} stroke="black" strokeWidth={2}
          onClick = {this.handleClick}/>
      </Group>
    );
  }
}

export default CircuitEditorConnection;
