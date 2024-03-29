import React, {Component} from 'react';
import {Image, Group} from 'react-konva';
import PropTypes from 'prop-types';
import CircuitEditorConnection from './CircuitEditorConnection'


class CircuitEditorElement extends Component {

  state = {
    image: null,
    isDragging: false,
    x: 0,
    y:0,
    connections : [],
    connectClicked:false,
    upOnConnect:false,
    selfKey : 0
  };

/*------------------------------------------------------------------------------
Загрузка и обработка изображения
------------------------------------------------------------------------------*/
  componentDidMount() {
    this.loadImage();
    this.setState({
      selfKey : this.props.selfKey,
      x : this.props.x,
      y: this.props.y,
      connections : this.props.connections
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

/*------------------------------------------------------------------------------
Отработка нажатия на соединение
------------------------------------------------------------------------------*/
  pinClick = (pinKey) => {
    console.log("Кликнуто соединение (2)");
    this.props.onPinClick([{element : this.state.selfKey,  connect : pinKey}]);
  };

/*------------------------------------------------------------------------------
Отработка остановки перетаскивания элемента для изменения стэйта в классе выше
------------------------------------------------------------------------------*/
  elementStopped = () => {
    console.log("Конец перетаскивания (1)");
    this.props.onStop([{selfKey : this.state.selfKey, x : this.state.x, y : this.state.y}]);
  }

  render() {
    return (
      <Group>
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
            /* не работатет удержание в границах */
            let pos_x = e.target.x();
            let pos_y = e.target.y();

            pos_y = pos_y < 60 ? 60 : pos_y;
            pos_y = pos_y > window.innerHeight ? window.innerHeight :  pos_y;

            pos_x = pos_x < 150 ? 150 : pos_x;
            pos_x = pos_x > window.innerWidth ? window.innerWidth : pos_x;

            /* не работатет удержание в границах */

            this.setState({
              x: pos_x,
              y: pos_y
            });
          }

        }
        onDragEnd = {()=>{
          this.setState({
            selfKey : this.props.selfKey,
            isDragging: false
        });
        this.elementStopped();
      }}
        />

        {this.state.connections.map(pin => <CircuitEditorConnection
          key = {pin.id} selfKey = {pin.id}
          pos_x = {this.state.x + pin.x} pos_y = {this.state.y + pin.y}
          onPinClick = {(pinKey) => this.pinClick(pinKey)}
          /> )}

      </Group>
    );
  }
}

export default CircuitEditorElement;
