//declaring variables

const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d')
let jumpLevelr= document.querySelector('.jump__level span')
let scoreBar = document.querySelector('.points span')
let level = document.querySelector('.level span')

jumpLevelr.textContent=13;
level.textContent=1;

canvas.width=600;
canvas.height=550;


//declaring html variables



//intervbal for obstacles
let presentTime = 1000;
let enemySpeed=5;
let animationId=null;
// sound effects
let score = 0;
let increment = 0;
let canScore = true;

// now we create the horizontal line
function drawBackgroundLine(){
   ctx.beginPath();
   ctx.moveTo(0,400);
   ctx.lineTo(600,400);
   ctx.lineWidth=1.9;
   ctx.strokeStyle='black';
   ctx.stroke();
}

function restart(button){
    card.style.display='none';
    button.blur();
    startGame();
    requestAnimationFrame(animate);
    console.log('btn  clicked');
    
}


let obstacles=[]; // empty array to store the objects
// animate to update each time , 




let box = new Box(ctx,150,350,50,'black');
animate();
function startGame(){
   box= new Box(ctx,150,350,50,'black');
   obstacles=[];
   increment=0;
   enemySpeed=5;
   canScore=true;
   presentTime = 1000
   
}


function animate(){
  animationId= requestAnimationFrame(animate);
   ctx.clearRect(0,0,canvas.width,canvas.height);
   drawBackgroundLine();
   box.draw();
   increaseEnemySpeed();
   obstacles.forEach((obstacle,index)=>{
       obstacle.slide(); // this are objects qand then we can acces this slide method eachj time
        if(collide(box,obstacle)){ // its true
             cancelAnimationFrame(animationId)
             console.log('collide');

        }
        if(isPastBlock(box,obstacle) && canScore){
            canScore=false;
            score ++;
            scoreBar.textContent=score;
            if(score===10){
               level.textContent=2;
            }
        }
       //Delete Block That has left the scrreen
       if((obstacle.x + obstacle.size)<=0){
              setTimeout(()=>{
                   obstacles.splice(index,1);
              },0)
       }
   })
}


function getRandom(min,max){
   return Math.floor(Math.random() * (max- min + 1) + min);
}

// random interval

function randomNumberGap(timeInterval){
   let returnTime = timeInterval;
   if(Math.random()<0.5){
       returnTime += getRandom(presentTime / 3 , presentTime * 1.5);

      
   }
   else{
       returnTime -= getRandom(presentTime / 3 , presentTime /2);
   }
   return  returnTime;
}


function increaseEnemySpeed(){
   if(increment + 10 === score){
       increment=score;
       enemySpeed++
       
       presentTime>=100? presentTime-=100:presentTime=presentTime/2 // make the blooks appear quickly

       //update exsiting blocks
       obstacles.forEach(arrayBlocks=>{
           arrayBlocks.slideSpeed= enemySpeed;
       })
   }
}


//auto generate blocks
function generateBlocks(){ // this generates some time for the blocks to appear

    let timeDelay  = randomNumberGap(presentTime); // 1000 secnds get a different range of times
    let randomSize=getSize();
    //pushing the object to the array 
    obstacles.push(new Block(canvas,50,enemySpeed,randomSize.startY,randomSize.double)) // 
     
    // each time some blocks get geneated
    setTimeout(generateBlocks,timeDelay); // this method will be called after the random ranges of times
}

//-50 and 0 for the heights
// 0 and 1
function getSize(){
    const type={}
    if(score>=10){
        if(Math.random()>0.5){
            type.startY=-50;
            type.double=2
            return type;
        }
        else{
            // return 0;
            type.startY=0;
            type.double=1;
            return type;
        }
    }
    else{
        type.startY=0;
        type.double=1;
        return type;
    }
    
}

function collide(player,block){

   //get exact copy of class objects
   let s1 = Object.assign(Object.create(Object.getPrototypeOf(player)),player);
   
   console.log(s1);
  

   let s2 = Object.assign(Object.create(Object.getPrototypeOf(block)),block);
   console.log(s2);

   //Dont need pixel Perfect collision detection

   s2.size = s2.size -10;
   s2.x = s2.x + 10;

   s2.y = s2.y + 10;

   
   return !(
       s1.x>s2.x + s2.size ||
       s1.x + s1.size < s2.x ||
       s1.y > s2.y + s2.size||
       s1.y + s1.size < s2.y
   )

   
}


// makking a class to add the circle


//if the player passes the block
function isPastBlock(player,block){
    return (
        player.x + (player.size/2) > block.x + (block.size/4) &&
        player.x + (player.size/2) < block.x + (block.size/4) *3

    )
}



setTimeout(()=>{
    generateBlocks();

},randomNumberGap(presentTime)) // in different times call this


addEventListener('keydown',e=>{
      if(e.code==='Space'){
          if(!box.shouldJump){
              box.jumpCounter=0;
              box.shouldJump=true;
              canScore=true;
          }
      }
})

addEventListener('keyup',(e)=>{
    if(e.code==='ArrowUp'){
        if(!box.increase){
            box.jumpHeight=19;
            jumpLevelr.textContent=box.jumpHeight;
            // if(box.jumpHeight>=18){
            //     box.jumpHeight=12;
                
                
            // }
        }
    }
})

addEventListener('keyup',(e)=>{
    if(e.code==='ArrowDown'){
        if(!box.increase){
            box.jumpHeight=12;
            jumpLevelr.textContent=box.jumpHeight;
  
        }
    }
})