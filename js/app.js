// contains all the calling of objects and ui methods

// 1st task to create the class that is responsible for the player

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('jump');

canvas.width=550;
canvas.height= 500;
console.log(canvas.width);

function drawRoad(){
    ctx.beginPath();
    ctx.moveTo(0,canvas.height-20);
    ctx.lineTo(canvas.width,canvas.height-20)
    ctx.lineWidth=15;
    ctx.lineCap='round'
    ctx.Strokestyle='#ccc';
    ctx.stroke();
}

const circle = new Circle(16,'red',canvas,ctx);
const obstacle = new Obstacles(canvas,ctx,50,2);


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    circle.drawCircle();
    obstacle.slide()
    drawRoad();
    
}
animate();

console.log(circle);



let a=0;
addEventListener('keydown',(e)=>{
    
    
      if(e.code==='Space'){
      
        
         console.log(a);
        if(!circle.canJump){
            circle.canJump=true;
            circle.jumpIncrement=0;
            
            circle.maxLimit=0;
           
          
        }
      }

    


})

addEventListener('keyup',(e)=>{
    if(e.code==='ArrowUp'){
        console.log(
            'ddd'
        );
        circle.maxHeight++;
        if(circle.maxHeight>20){
            circle.maxHeight=8
        }
    }
    
    console.log(e.code);
})

