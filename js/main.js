import {TOOL_LINE,TOOL_RECTANGE,TOOL_CIRCLE,TOOL_TRIANGLE,TOOL_PENCIL,TOOL_SQURE,TOOL_BRUSH} from './tool.js'
import Paint from './paint.class.js'


var paint =new Paint("canvas")
paint.activeTool = TOOL_LINE;
paint.init();

document.querySelectorAll("[data-command]").forEach(
    item => {
        item.addEventListener("click", e =>{
            console.log(item.getAttribute("data-command"));
            
        });
    }
);




document.querySelectorAll("[data-tools]").forEach(
    item => {
        item.addEventListener("click", e =>{
            // console.log(item.getAttribute("data-tools"));
  
            document.querySelector("[data-tools].active").classList.toggle("active");
            item.classList.toggle("active");
            let selectedTool = item.getAttribute("data-tools");

            paint.activeTool=selectedTool;
         
            switch(selectedTool){
                case TOOL_LINE:
                case TOOL_RECTANGE:
                case TOOL_CIRCLE:
                case TOOL_TRIANGLE:
                case TOOL_PENCIL:
                case TOOL_SQURE:
                    // Active shape linewidths group
                    document.querySelector(".group.for-shapes").style.display = "block"
                    // DeActivate brush line widths group
                    document.querySelector(".group.for-brushs").style.display = "none"

                    break;
                case TOOL_BRUSH:
                    // Activate brush line widths group
                    document.querySelector(".group.for-brushs").style.display = "block"
                    // DeActive shape linewidths group
                    document.querySelector(".group.for-shapes").style.display = "none"
                    
                   
                   
                    break;
                default:
                    // make invisible both linewidths group
                    document.querySelector(".group.for-brushs").style.display = "none"
                    document.querySelector(".group.for-shapes").style.display = "none"

                
            }

        });
    }
);


document.querySelectorAll("[data-line-width]").forEach(
    item => {
        item.addEventListener("click", e =>{
            
            document.querySelector("[data-line-width].active").classList.toggle("active");
            item.classList.toggle("active");
        });
    }
);


