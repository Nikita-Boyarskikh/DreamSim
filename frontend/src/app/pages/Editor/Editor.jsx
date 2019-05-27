import React from 'react';
import PropTypes from 'prop-types';
import {Stage, Layer} from 'react-konva';

import WithLayoutHOC from 'app/hocs/WithLayoutHOC';

import CircuitEditor from 'app/components/CircuitEditor/CircuitEditor';
import CircuitEditorElement from 'app/components/CircuitEditor/CircuitEditorElement';
import CircuitEditorLeftMenu from 'app/components/CircuitEditor/CircuitEditorLeftMenu';
import CircuitEditorWire from 'app/components/CircuitEditor/CircuitEditorWire';

class Editor extends React.Component {

  state = {
    isDrawing: false,
    setDrawing: false,
    lines: [],
    setLines: [],
    connectClicked:false,
    upOnConnect:false
  };

  pinClick = () => {
    console.log("Нажат последний уровень");
    this.setState({
      connectClicked:true
    });
  };

  pinUp = () => {
    console.log("Отпущен последний уровень");
    this.setState({
      upOnConnect:true
    });
  };

  render() {
    return (
      <div className="page">
        <Stage width={window.innerWidth} height={window.innerHeight}

          onMouseDown={e => {
            if (this.state.connectClicked){
              const pos = e.target.getStage().getPointerPosition();
              const newLine = ([pos, pos]);
              const newLines = this.state.lines;
              newLines.push(newLine);
              this.setState({
                lines : newLines
              });
              this.setState({
                isDrawing : true,
                connectClicked : false
              });
            }
          }}

          onMouseMove={e => {
            if (this.state.isDrawing) {

              const pos = e.target.getStage().getPointerPosition();



              const newLines = this.state.lines;
              let newCords = newLines.pop();

              newCords[1] = pos;

              newLines.push(newCords);

              this.setState({
                lines : newLines
              });
            }
          }}

          onMouseUp={e => {
            if (this.state.upOnConnect){
              this.setState({
                isDrawing : false,
                upOnConnect : false
              });
            } else {
              if(isDrawing){
                const newLines = this.state.lines;
                newLines.pop();
                this.setState({
                  isDrawing : false,
                  lines : newLines
                });
              }

            }
          }}
        >
          <Layer>

            <CircuitEditorLeftMenu
              backendElements = {[
              {id:0,image:"/images/draggingScreenshot.png",x:10,y:80, w:145, h:103, inConnections:[{id:0, y:25},{id:1, y:50},{id:2, y:85}],outConnections:[{id:0, y:16},{id:1, y:37},{id:2, y:58},{id:3, y:79}]},
              {id:1,image:"/images/draggingScreenshot.png",x:10,y:80, w:145, h:103, inConnections:[{id:0, y:25},{id:1, y:50},{id:2, y:85}],outConnections:[{id:0, y:16},{id:1, y:37},{id:2, y:58},{id:3, y:79}]},
              {id:2,image:"/images/draggingScreenshot.png",x:10,y:80, w:145, h:103, inConnections:[{id:0, y:25},{id:1, y:50},{id:2, y:85}],outConnections:[{id:0, y:16},{id:1, y:37},{id:2, y:58},{id:3, y:79}]},
              {id:3,image:"/images/draggingScreenshot.png",x:10,y:80, w:145, h:103, inConnections:[{id:0, y:25},{id:1, y:50},{id:2, y:85}],outConnections:[{id:0, y:16},{id:1, y:37},{id:2, y:58},{id:3, y:79}]},

              {id:4,image:"/images/draggingScreenshot1.png",x:10,y:200, w:70, h:103, inConnections:[{id:0, y:18},{id:1, y:82}],outConnections:[{id:0, y:48}]},
              {id:5,image:"/images/draggingScreenshot1.png",x:10,y:200, w:70, h:103, inConnections:[{id:0, y:18},{id:1, y:82}],outConnections:[{id:0, y:48}]},
              {id:6,image:"/images/draggingScreenshot1.png",x:10,y:200, w:70, h:103, inConnections:[{id:0, y:18},{id:1, y:82}],outConnections:[{id:0, y:48}]},
              {id:7,image:"/images/draggingScreenshot1.png",x:10,y:200, w:70, h:103, inConnections:[{id:0, y:18},{id:1, y:82}],outConnections:[{id:0, y:48}]},

              {id:8,image:"/images/draggingScreenshot2.png",x:10,y:430, w:70, h:103, inConnections:[],outConnections:[{id:0, y:48}]},
              {id:9,image:"/images/draggingScreenshot2.png",x:10,y:430, w:70, h:103, inConnections:[],outConnections:[{id:0, y:48}]},
              {id:10,image:"/images/draggingScreenshot2.png",x:10,y:430, w:70, h:103, inConnections:[],outConnections:[{id:0, y:48}]},
              {id:11,image:"/images/draggingScreenshot2.png",x:10,y:430, w:70, h:103, inConnections:[],outConnections:[{id:0, y:48}]},

              {id:12,image:"/images/draggingScreenshot3.png",x:10,y:320, w:70, h:103, inConnections:[],outConnections:[{id:0, y:48}]},
              {id:13,image:"/images/draggingScreenshot3.png",x:10,y:320, w:70, h:103, inConnections:[],outConnections:[{id:0, y:48}]},
              {id:14,image:"/images/draggingScreenshot3.png",x:10,y:320, w:70, h:103, inConnections:[],outConnections:[{id:0, y:48}]},
              {id:15,image:"/images/draggingScreenshot3.png",x:10,y:320, w:70, h:103, inConnections:[],outConnections:[{id:0, y:48}]},


              ]}
              onPinClick={() => this.pinClick()}
              onPinUp = {() => this.pinUp()}
            />
            <CircuitEditor
              elements = {[{id:1,image:"/images/draggingScreenshot.png",x:350,y:350, w:145, h:103, inConnections:[{id:0, y:25},{id:1, y:50},{id:2, y:85}],outConnections:[{id:0, y:16},{id:1, y:37},{id:2, y:58},{id:3, y:79}]}]}
              onPinClick={() => this.pinClick()}
              onPinUp = {() => this.pinUp()}
            />
            {this.state.lines.map(l => (<CircuitEditorWire key={l[0].x} points={l} />))}
          </Layer>
        </Stage>
      </div>
    );
  };
}

export default WithLayoutHOC(Editor);
