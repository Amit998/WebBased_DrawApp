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

    set lineWidth(linewidth){
        this._linewidth=linewidth;
        this.context.lineWidth=this._linewidth;

    }
    set brushSize(bSize){
        this._brushSize=bSize;
       
    }

    set selectColor(color){
        this._color=color;
        this.context.strokeStyle=this._color;
    }

    init(){
        this.canvas.onmousedown = (e) => this.onMouseDown(e);
       
        
        // this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e))

        
       
    }
    


  

    onMouseDown(e){
        console.log(this._linewidth);
        this.context.strokeStyle=this._color;
        
        this.saveData=this.context.getImageData(0,0,this.canvas.clientWidth,this.canvas.clientHeight)
       

        this.canvas.onmousemove=e=> this.onMouseMove(e);
        document.onmouseup=e=> this.onMouseUp(e);
        this.startPos=getMouseCoordsOnCanvas(e,this.canvas);
      

        if(this.tool == TOOL_PENCIL || this.tool == TOOL_BRUSH){
            this.context.beginPath();
            this.context.moveTo(this.startPos.x,this.startPos.y)
        }
                


       

    }

    onMouseMove(e){
        
        this.currentPos=getMouseCoordsOnCanvas(e,this.canvas);
        

        switch(this.tool){
            case TOOL_LINE:
            case TOOL_RECTANGE:
            case TOOL_CIRCLE:
            case TOOL_TRIANGLE:
            case TOOL_SQURE:
                this.drawShape();
                break
            case TOOL_PENCIL:
                
                this.drawFreeLine(this._linewidth);
                break;
            case TOOL_BRUSH:
                this.drawFreeLine(this._brushSize);
                
            default:
                break;
        }

    }


 
    onMouseUp(e){
        this.canvas.onmousemove=null;
        document.onmouseup=null;
        console.log('up')

    }
    drawShape(){
        this.context.putImageData(this.saveData,0,0);
        this.context.beginPath();


        if(this.tool == TOOL_LINE){
           
            this.context.moveTo(this.startPos.x,this.startPos.y);
            this.context.lineTo(this.currentPos.x,this.currentPos.y);
        
        } 
        
        else if(this.tool == TOOL_RECTANGE){
            this.context.rect(this.startPos.x,this.startPos.y,this.currentPos.x - this.startPos.x,this.currentPos.y-this.startPos.y);
        }else if(this.tool == TOOL_CIRCLE){
            let distance = findDitance(this.startPos,this.currentPos)
            this.context.arc(this.startPos.x,this.startPos.y,distance,0 ,2 * Math.PI,false);
        }else if(this.tool == TOOL_SQURE){

            this.context.rect(this.startPos.x,this.startPos.y,this.currentPos.x - this.startPos.x,this.currentPos.y-this.startPos.y);
        }else if(this.tool == TOOL_TRIANGLE){  
            this.context.moveTo(this.startPos.x + (this.currentPos.x - this.startPos.x) / 2 ,this.startPos.y)
            this.context.lineTo(this.startPos.x,this.currentPos.y);
            this.context.lineTo(this.currentPos.x,this.currentPos.y);
            this.context.closePath();
        }

        this.context.stroke();

    }
    drawFreeLine(_lineWidth){
        this.context.lineWidth=_lineWidth
        this.context.lineTo(this.currentPos.x,this.currentPos.y);
        this.context.stroke()
    }

}
