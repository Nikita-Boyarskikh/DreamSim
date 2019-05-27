import React, {Component} from 'react';
import {Image, Group} from 'react-konva';
import PropTypes from 'prop-types';
import CircuitEditorConnection from './CircuitEditorConnection'


class CircuitEditorElement extends Component {

  state = {
    image: null,
    isDragging: false,
    x: this.props.x,
    y: this.props.y,
    connectClicked:false,
    upOnConnect:false,
    inClickedConnections: [],
    outClickedConnections: []

  };

  componentDidMount() {
    this.loadImage();
    this.setState({
      inClickedConnections:this.props.inConnections,
      outClickedConnections:this.props.outConnections
    });
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
      image: this.image
    });
  };

  pinUp = () => {
    console.log("отпущен уровень 1");
    this.setState({
      upOnConnect:true
    });
  };

  pinClick = () => {
    console.log("нажат уровень 1");
    this.setState({
      connectClicked:true
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

  render() {
    return (
      <Group onMouseDown = {this.handleClick} onMouseUp = {this.handleUp}>

        <Image
          opacity={this.state.isDragging ? 0.7 : 1}
          x={this.state.x}
          y={this.state.y}
          image={this.state.image}
          draggable
          onDragStart = {() => {
            this.setState({
              isDragging: true
            });
          }}
          onDragMove = { e => {
            this.setState({
              x: e.target.x(),
              y: e.target.y()
            });
          }}
          onDragEnd={ e => {
            this.setState({
              isDragging: false
            });
          }}
        />

        {this.state.inClickedConnections.map(inPin => <CircuitEditorConnection
          key = {inPin.id} pos_x = {this.state.x - 1} pos_y = {this.state.y + inPin.y}
          onPinClick = {() => this.pinClick()}
          onPinUp = {() => this.pinUp()}
          /> )}
        {this.state.outClickedConnections.map(outPin => <CircuitEditorConnection
          key = {outPin.id} pos_x = {this.state.x + this.props.w - 1} pos_y={this.state.y + outPin.y}
          onPinClick = {() => this.pinClick()}
          onPinUp = {() => this.pinUp()}

          /> )}

      </Group>
    );
  }
}

export default CircuitEditorElement;
