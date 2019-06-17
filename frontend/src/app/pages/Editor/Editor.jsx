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
    xDrawing:0,
    yDrawing:0,
    lines: [],
    elements: [],

    flagelementChosen : false,
    elementChosen : [],
    userKeys : 0
  };

/*------------------------------------------------------------------------------
Отработка нажатия на соединение
------------------------------------------------------------------------------*/
  pinClick = (pin) => {
    console.log("Кликнуто соединение (4)");
    console.log(pin);
    this.setState({
      isDrawing : !this.state.isDrawing
    });
    if(this.state.isDrawing){
      const newLine = {start : [{el : pin[0].element , pin : pin[0].connect}] ,
        end : [{el : -1, pin : -1, extraX : 0}] , points : [0,0,0,0] ,
        elements : this.state.elements , isEnded : false};
      if(pin[0].side == 2){
        newLine.points.push(20);
        newLine.points.push(0);
        newLine.points.push(20);
        newLine.points.push(0);
      }
      const newLines = this.state.lines;
      newLines.push(newLine);
      this.setState({
        lines : newLines,
        xDrawing : pin[0].x,
        yDrawing : pin[0].y
      });
    }else{
      const lines = this.state.lines;
      const line = lines.pop();
      line.end[0].el = pin[0].element;
      line.end[0].pin = pin[0].connect;
      if(pin[0].side == 2){
        line.end[0].extraX = 20;
      }
      lines.push(line);
      this.setState({
        lines : lines
      });
    }
  };

/*------------------------------------------------------------------------------
Выбор элемента в левом меню приводит к вызову этой функции, что кладет все
характеристики выбраного элемента в стэйт, откуда они присвоятся элементу
схемы пользователя при нажатии на поле редактирования схемы
------------------------------------------------------------------------------*/
  elementChosen = (clickedElement) => {
    this.setState({
      flagelementChosen : true,
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

      /*  onMouseMove={ (e) => {
          const pos = e.target.getStage().getPointerPosition();
          if(pos.x > 182){

            if(this.state.isDrawing){
              const lines = this.state.lines;
              const line = lines.pop();
              line.points.pop();
              line.points.pop();
              line.points.push(pos.x - this.state.xDrawing);
              line.points.push(pos.y - this.state.yDrawing);
              lines.push(line);
              this.setState({
                lines : lines
              });
            }

          }
        }}*/

        onClick = { (e) => {
          const pos = e.target.getStage().getPointerPosition();
          console.log(pos);
            if (this.state.isDrawing){
              const lines = this.state.lines;
              const line = lines.pop();
              line.points.push(pos.x - this.state.xDrawing);
              line.points.push(pos.y - this.state.yDrawing);
              line.points.push(pos.x - this.state.xDrawing);
              line.points.push(pos.y - this.state.yDrawing);
              lines.push(line);
              this.setState({
                lines : lines
              });
          }
        }}

        onDblClick = { (e) => {
          const pos = e.target.getStage().getPointerPosition();
          if (pos.x > 182){
            if(this.state.isDrawing){
              const newLines = this.state.lines;
              newLines.pop();
              this.setState({
                isDrawing : false,
                lines : newLines
              });

            }
          };
        }}

        onMouseUp={e => {
          const pos = e.target.getStage().getPointerPosition();
          if (this.state.flagelementChosen && pos.x > 182){
            const newElements = this.state.elements;
            const newElement = this.state.elementChosen[0];
            newElement.x = pos.x ;
            newElement.y = pos.y ;
            newElement.selfKey = this.state.userKeys;
            const nextKey = this.state.userKeys + 1;
            newElements.push(newElement);
            this.setState({
              userKeys : nextKey ,
              elements : newElements,
              flagelementChosen : false
            });
          }else{
            this.setState({
              flagelementChosen : false,
              elementChosen : []
            });
          }

        }}
        >
          <Layer>
            <CircuitEditorLeftMenu
              backendElements = {[
              {id:0,image:"/images/or.png",x:10,y:20, w:87, h:72,
              connections:[{id:0, y:19, x:0, side:0},{id:1, y:53, x:0,side:0},{id:2, y:37, x:72,side:2}]},
              {id:1,image:"/images/and.png",x:10,y:130, w:120, h:80,
              connections:[{id:0, y:20, x:0, side:0},{id:1, y:60, x:0, side:0},{id:2, y:40, x:100, side:2}]},
              {id:8,image:"/images/DC-2-4.png",x:10,y:230, w:140, h:100,
              connections:[{id:0, y:20, x:0, side:0},{id:1, y:40, x:0, side:0},{id:2, y:80, x:0, side:0},{id:3, y:20, x:120, side:2},{id:4, y:40, x:120, side:2},{id:5, y:60, x:120, side:2},{id:6, y:80, x:120, side:2}]}
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
