import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircuitEditorLeftMenuElement from './CircuitEditorLeftMenuElement'
import { Group, Text, Line } from 'react-konva';

class CircuitEditorLeftMenu extends React.Component{

  state = {
    elementClicked : false,
    clickedElement : []
  };

  elementClick = (thisElement) => {
    this.setState({
      elementClicked : true ,
      clickedElement : thisElement
    });
  };

  handleClick = () => {
    if(this.state.elementClicked){
      this.props.onElementClick(this.state.clickedElement);
      this.setState({
        connectClicked : false
      });
    }
  }

  render(){
    return(
      <Group onMouseDown = {this.handleClick} >
        <Text text="Список Элементов" fontSize={15} x={15} y={65} />
        {this.props.backendElements.map(element =>  <CircuitEditorLeftMenuElement
          key={element.id}
          image={element.image} x={element.x} y={element.y}
          connections={element.connections}
          onChooseElement={(thisElement) => this.elementClick(thisElement)}
          />)}
        <Line x={180} y={0} points={[0, 0, 0, 10000]} stroke={"black"}/>
      </Group>
    );
  }

}

export default CircuitEditorLeftMenu;
