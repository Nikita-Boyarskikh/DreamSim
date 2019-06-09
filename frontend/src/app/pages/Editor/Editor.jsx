import React from 'react';
import PropTypes from 'prop-types';
import {Stage, Layer} from 'react-konva';
import uuid from "uuid";

import WithLayoutHOC from 'app/hocs/WithLayoutHOC';

import CircuitEditor from 'app/components/CircuitEditor/CircuitEditor';
import CircuitEditorElement from 'app/components/CircuitEditor/CircuitEditorElement';
import CircuitEditorLeftMenu from 'app/components/CircuitEditor/CircuitEditorLeftMenu';
import CircuitEditorWire from 'app/components/CircuitEditor/CircuitEditorWire';

class Editor extends React.Component {

  state = {
    isDrawing: false,
    lines: [],
    elements: [],
    flagElementChoosen : false,
    elementChoosen : [],
    userKeys : 0
  };

/*------------------------------------------------------------------------------
Отработка нажатия на соединение
------------------------------------------------------------------------------*/
  pinClick = (pin) => {
    console.log("Кликнуто соединение (4)");
    this.setState({
      isDrawing : !this.state.isDrawing
    });
    if(this.state.isDrawing){
      const newLine = {start : [{el : pin[0].element , pin : pin[0].connect}] ,
        end : [{el : 0, pin : 0}] , points : [0,0] ,
        elements : this.state.elements , isEnded : false};
      const newLines = this.state.lines;
      newLines.push(newLine);
      this.setState({
        lines : newLines
      });
    }else{
      const lastLine = this.state.lines[this.state.lines.length - 1];
    }
  };

/*------------------------------------------------------------------------------
Выбор элемента в левом меню приводит к вызову этой функции, что кладет все
характеристики выбраного элемента в стэйт, откуда они присвоятся элементу
схемы пользователя при нажатии на поле редактирования схемы
------------------------------------------------------------------------------*/
  elementChosen = (clickedElement) => {
    this.setState({
      flagElementChoosen : true,
      elementChosen : clickedElement
    });
  };

/*------------------------------------------------------------------------------
Обрабатывает переещение уже находящегося на поле редактирования элемента,
по его остановке для добавления в стэйт обновленных координат
------------------------------------------------------------------------------*/
  elementStopped = (element) => {
    console.log("Конец перетаскивания (3)");
    const changingElems = this.state.elements;
    changingElems[element[0].selfKey].x = element[0].x;
    changingElems[element[0].selfKey].y = element[0].y;
    this.setState({
      elements:changingElems
    });
  }

/*------------------------------------------------------------------------------
Отрисовка страницы состоящей из левого меню выбора элементов и
поля редактиррования пользователем схемы
------------------------------------------------------------------------------*/
  render() {
    return (
      <div className="page">
        <Stage width={window.innerWidth} height={window.innerHeight}

        onMouseMove={e => {
        }}

        onMouseUp={e => {
          if (this.state.flagElementChoosen){
            const newElements = this.state.elements;
            const newElement = this.state.elementChosen[0];
            newElement.x = e.target.getStage().getPointerPosition().x ;
            newElement.y = e.target.getStage().getPointerPosition().y ;
            newElement.selfKey = this.state.userKeys;
            const nextKey = this.state.userKeys + 1;
            newElements.push(newElement);
            this.setState({
              userKeys : nextKey ,
              elements : newElements,
              flagElementChoosen : false
            });
          }

        }}
        >
          <Layer>
            <CircuitEditorLeftMenu
              backendElements = {[
              {id:0,image:"/images/AND.png",x:10,y:80, w:120, h:80,
              connections:[{id:0, y:20, x:0},{id:1, y:60, x:0},{id:2, y:40, x:100}]},
              {id:1,image:"/images/OR.png",x:10,y:200, w:120, h:80,
              connections:[{id:0, y:20, x:0},{id:1, y:60, x:0},{id:2, y:40, x:100}]},
              {id:8,image:"/images/DC-2-4.png",x:10,y:320, w:140, h:100,
              connections:[{id:0, y:20, x:0},{id:1, y:40, x:0},{id:2, y:80, x:0},{id:3, y:20, x:120},{id:4, y:40, x:120},{id:5, y:60, x:120},{id:6, y:80, x:120}]}
              ]}
              onElementClick = {(clickedElement) => this.elementChosen(clickedElement) }
            />
          </Layer>
            <CircuitEditor
              onPinClick={(pin) => this.pinClick(pin)}
              elements = {this.state.elements}
              onStop = {(element) => this.elementStopped(element)}
            />
          <Layer>
            {this.state.lines.map(l => (<CircuitEditorWire key={uuid.v4()}  points={l.points} start = {l.start} end = {l.end} isEnded = {l.isEnded} elements = {this.state.elements} />))}
          </Layer>
        </Stage>
      </div>
    );
  };
}

export default WithLayoutHOC(Editor);
