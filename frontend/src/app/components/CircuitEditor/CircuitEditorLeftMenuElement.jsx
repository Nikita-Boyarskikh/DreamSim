import React, {Component} from 'react';
import {Image, Group} from 'react-konva';
import PropTypes from 'prop-types';
import CircuitEditorConnection from './CircuitEditorConnection'


class CircuitEditorLeftMenuElement extends Component {

  state = {
    image: null,
    x: this.props.x,
    y: this.props.y,
    connections : [],
    thisElement: []
  };

  componentDidMount() {
    this.loadImage();
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    this.image = new window.Image();
    this.image.src = this.props.image;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    this.setState({
      image: this.image,
      connections : this.props.connections
    });
  };

/*------------------------------------------------------------------------------
Отработка нажатия мышкой на элемент для выбора его и перетаскивания его
на поле редактирования пользователем
------------------------------------------------------------------------------*/
  handleClick = () => {
    this.props.onChooseElement([{id:this.props.id ,
      selfKey : 0 ,
      x : 0, y : 0,
      connections : this.state.connections,
      image : this.state.image.src}]);
  }

  pinClick = (pinKey) => {
  };

  render(){
    return (
      <Group onMouseDown = {this.handleClick}>

        <Image
          x={this.state.x}
          y={this.state.y}
          image={this.state.image}
        />
        {this.state.connections.map(pin => <CircuitEditorConnection
          key = {pin.id} selfKey = {pin.id}
          pos_x = {this.state.x + pin.x} pos_y = {this.state.y + pin.y}
          onPinClick = {(pinKey) => this.pinClick(pinKey)}
          /> )}

      </Group>
    )
  }
}

export default CircuitEditorLeftMenuElement;
