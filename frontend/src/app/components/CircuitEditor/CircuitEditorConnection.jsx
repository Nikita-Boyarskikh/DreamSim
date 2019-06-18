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
    this.props.onPinClick([{connect : this.state.selfKey, element : 0, x : this.props.pos_x  , y : this.props.pos_y , side : this.props.side}]);
  }

  render(){
    return(
      <Group>
        <Rect x = {this.props.pos_x} y = {this.props.pos_y - 10} width = {20} height = {20} fill = "white"
          onClick = {this.handleClick} opacity = {0.0}/>
        <Line x = {this.props.pos_x} y = {this.props.pos_y} points = {[0,0,20,0]} stroke="black" strokeWidth={1}
          onClick = {this.handleClick} />
      </Group>
    );
  }
}

export default CircuitEditorConnection;
