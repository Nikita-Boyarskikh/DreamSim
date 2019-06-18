import React from 'react';
import PropTypes from 'prop-types';
import {Stage, Layer, Line} from 'react-konva';
import uuid from "uuid";

import WithLayoutHOC from 'app/hocs/WithLayoutHOC';

import CircuitEditor from 'app/components/CircuitEditor/CircuitEditor';
import CircuitEditorElement from 'app/components/CircuitEditor/CircuitEditorElement';
import CircuitEditorLeftMenu from 'app/components/CircuitEditor/CircuitEditorLeftMenu';
import CircuitEditorWire from 'app/components/CircuitEditor/CircuitEditorWire';

class Editor extends React.Component {

  state = {
/*стейт для отрисовки соединений*/
    isDrawing : false,
    xDrawing : 0,
    yDrawing : 0,
    lines : [],
    wireKeys : 0,

/*стейт для отрисовки текущей линии при движении*/
    currentOpacity : 0,
    currentX : 0,
    currentY : 0,
    currentPoints : [0,0,0,0],

/*стейт для перетаскивания элементов*/
    elements : [],
    flagelementChosen : false,
    elementChosen : [],
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
        end : [{el : -1, pin : -1, extraX : 0}] , points : [0,0,0,0] ,
        elements : this.state.elements , isEnded : false, selfKey : this.state.wireKeys};
      if(pin[0].side == 2){
        newLine.points.push(20);
        newLine.points.push(0);
        newLine.points.push(20);
        newLine.points.push(0);
        this.setState({
          currentPoints : [0,0,20,0,0,0]
        });
      }
      const newLines = this.state.lines;
      newLines.push(newLine);
      this.setState({
        lines : newLines,
        xDrawing : pin[0].x,
        yDrawing : pin[0].y,
        currentX : pin[0].x,
        currentY : pin[0].y,
        currentOpacity : 0.6
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
        lines : lines,
        wireKeys : this.state.wireKeys + 1,
        currentOpacity : 0,
        currentPoints : [0,0,0,0]
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
        <Stage width={window.innerWidth} height={5000/*window.innerHeight*/}

        onMouseMove={ (e) => {
          const pos = e.target.getStage().getPointerPosition();
          if(pos.x > 182){
            if(this.state.isDrawing){
                const points = this.state.currentPoints;
                points.pop();
                points.pop();
                points.push(pos.x - this.state.currentX);
                points.push(pos.y - this.state.currentY);
              this.setState({
                currentPoints : points
              });
            }
          }
        }}

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
                lines : lines,
                currentX : pos.x,
                currentY : pos.y,
                currentPoints : [0,0,0,0]
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
                lines : newLines,
                currentOpacity : 0,
                currentPoints : [0,0,0,0]
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
              {id:0,image:"/images/or.png",x:10,y:20, w:87, h:71,
              connections:[{id:0, y:19, x:0, side:0},{id:1, y:53, x:0,side:0},{id:2, y:37, x:67,side:2}]},
              {id:1,image:"/images/and.png",x:10,y:110, w:87, h:71,
              connections:[{id:0, y:19, x:0, side:0},{id:1, y:53, x:0,side:0},{id:2, y:37, x:67,side:2}]},
              {id:2,image:"/images/orNot.png",x:10,y:200, w:90, h:71,
              connections:[{id:0, y:19, x:0, side:0},{id:1, y:53, x:0,side:0},{id:2, y:37, x:70,side:2}]},
              {id:3,image:"/images/andNot.png",x:10,y:290, w:90, h:71,
              connections:[{id:0, y:19, x:0, side:0},{id:1, y:53, x:0,side:0},{id:2, y:37, x:70,side:2}]},
              {id:4,image:"/images/gen.png",x:10,y:380, w:87, h:71,
              connections:[{id:0, y:37, x:67,side:2}]},
              {id:5,image:"/images/prob.png",x:10,y:470, w:87, h:30,
              connections:[{id:0, y:15, x:0,side:0}]}
              ]}
              onElementClick = {(clickedElement) => this.elementChosen(clickedElement) }
            />
          </Layer>

          <Layer>
            {this.state.lines.map(l => (<CircuitEditorWire key={uuid.v4()} selfKey = {l.selfKey} points={l.points} start = {l.start} end = {l.end} isEnded = {l.isEnded} elements = {this.state.elements} />))}
            <Line
              x = {this.state.currentX}
              y = {this.state.currentY}
              points = {this.state.currentPoints}
              opacity = {this.state.currentOpacity}
              stroke = "black"
            />
          </Layer>

          <Layer>
            <CircuitEditor
              onPinClick={(pin) => this.pinClick(pin)}
              elements = {this.state.elements}
              onStop = {(element) => this.elementStopped(element)}
            />
          </Layer>

        </Stage>
      </div>
    );
  };
}

export default WithLayoutHOC(Editor);
