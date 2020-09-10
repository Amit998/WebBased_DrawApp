import Point from './point.model.js';
import {getMouseCoordsOnCanvas,findDitance } from './utility.js';
import {TOOL_LINE,TOOL_RECTANGE,TOOL_CIRCLE,TOOL_TRIANGLE,TOOL_PENCIL,TOOL_SQURE,TOOL_BRUSH} from './tool.js'

export default class Paint{
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.context= canvas.getContext("2d");
    }

    set activeTool(tool){
        this.tool=tool;
        // console.log(this.tool);

    }
    init(){
        this.canvas.onmousedown = (e) => this.onMouseDown(e);
    }

  

    onMouseDown(e){
        this.saveData=this.context.getImageData(0,0,this.canvas.clientWidth,this.canvas.clientHeight)
        
        this.canvas.onmousemove = (e) => this.onMouseMove(e);
        document.onmouseup = (e) => this.onMouseUp(e);



        // console.log(e.clientX,e.clientY);
        this.startPos=getMouseCoordsOnCanvas(e,this.canvas);
        console.log(this.startPos);
    }

    onMouseMove(e){
        console.log(e.clientX,e.clientY,'lol');
        
        switch(this.tool){
            case TOOL_LINE:
            case TOOL_RECTANGE:
            case TOOL_CIRCLE:
            case TOOL_TRIANGLE:
                this.drawShape();
                break
            default:
                break;
        }

    }


 
    onMouseUp(e){
        this.canvas.onmousemove=null;
        document.onmouseup=null;

    }
    drawShape(){
        this.context.putImageData(this.saveData,0,0);
        this.context.beginPath();


        if(this.tool == TOOL_LINE){
        this.context.moveTo(this.startPos.x,this.startPos.y);
        this.context.lineTo(this.currentPos.x,this.currentPos.y);
        
        }else if(this.tool == TOOL_RECTANGE){
            this.context.rect(this.startPos.x,this.startPos.y,this.currentPos.x - this.startPos.x,this.currentPos.y-this.startPos.y);
        }else if(this.tool == TOOL_CIRCLE){
            let distance = findDitance(this.startPos,this.currentPos)
            this.context.arc(this.startPos.x,this.startPos.y,distance,0 ,2 * Math.PI,false);
        }else if(this.tool == TOOL_TRIANGLE){
            this.context.moveTo(this.startPos.x + (this.currentPos.x - this.startPos.x) / 2 ,this.startPos.y)
            this.context.lineTo(this.startPos.x,this.currentPos.y);
            this.context.lineTo(this.startPos.y,this.currentPos.y);
            this.context.closePath();
        }

        this.context.stroke();

    }

}