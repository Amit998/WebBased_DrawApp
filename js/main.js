import Tool from './tool.class.js'


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
         
            switch(selectedTool){
                case Tool.TOOL_LINE:
                case Tool.TOOL_RECTANGE:
                case Tool.TOOL_CIRCLE:
                case Tool.TOOL_TRIANGLE:
                case Tool.TOOL_PENCIL:
                case Tool.TOOL_SQURE:
                    // Active shape linewidths group
                    document.querySelector(".group.for-shapes").style.display = "block"
                    // DeActivate brush line widths group
                    document.querySelector(".group.for-brushs").style.display = "none"

                    break;
                case Tool.TOOL_BRUSH:
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


