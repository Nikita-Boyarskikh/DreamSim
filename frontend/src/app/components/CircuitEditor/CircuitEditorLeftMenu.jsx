import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircuitEditorElement from './CircuitEditorElement'
import { Group, Text, Line } from 'react-konva';

class CircuitEditorLeftMenu extends React.Component{

  state = {
    connectClicked:false,
    upOnConnect:false
  };

  pinClick = () => {
    console.log("нажат уровень 2");
    this.setState({
      connectClicked:true
    });
  };

  pinUp = () => {
    console.log("отпущен уровень 2");
    this.setState({
      upOnConnect:true
    });
  };

  handleClick = () => {
    if(this.state.connectClicked){
      this.props.onPinClick();
      this.setState({
        connectClicked:false
      });
    }
  }

  handleUp = () => {
    if(this.state.upOnConnect){
      this.props.onPinUp();
      this.setState({
        upOnConnect:false
      });
    }
  }

  render(){
    return(
      <Group onMouseDown = {this.handleClick} onMouseUp = {this.handleUp}>
        <Text text="Список Элементов" fontSize={15} x={15} y={65} />
        {this.props.backendElements.map(element =>  <CircuitEditorElement key={element.id}
          image={element.image} x={element.x} y={element.y}
          w={element.w} h={element.h}
          inConnections={element.inConnections} outConnections={element.outConnections}
          onPinClick={() => this.pinClick()}
          onPinUp = {() => this.pinUp()}
          />)}
        <Line x={180} y={0} points={[0, 0, 0, 10000]} stroke={"black"}/>
      </Group>
    )
  }

}

export default CircuitEditorLeftMenu;
