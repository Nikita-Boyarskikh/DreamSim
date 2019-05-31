import React from 'react';
import { Group } from 'react-konva';
import CircuitEditorElement from './CircuitEditorElement';


class CircuitEditor extends React.Component {

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
  };

  handleUp = () => {
    if(this.state.upOnConnect){
      this.props.onPinUp();
      this.setState({
        upOnConnect:false
      });
    }
  };

  render(){
    return(
      <Group onMouseDown = {this.handleClick} onMouseUp = {this.handleUp}>
        {this.props.elements.map(element => <CircuitEditorElement
          key={element.id} image={element.image}
          x={element.x} y={element.y}
          w={element.w} h={element.h}
          inConnections={element.inConnections}
          outConnections={element.outConnections}
          onPinClick={() => this.pinClick()}
          onPinUp = {() => this.pinUp()}
          />)}
      </Group>
    );
  }
}


export default CircuitEditor
