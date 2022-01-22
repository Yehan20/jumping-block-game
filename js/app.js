/*summarys

Class js has the classes of the player and the block , objects are called in app 
js file

*/



//declaring variables

const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d')
const gameOver = document.querySelector('.game__over')

//stats labels
let jumpLevelr= document.querySelector('.jump__level span')
let scoreBar = document.querySelector('.points span')
let level = document.querySelector('.level span')

//buttons
const finalScore = document.querySelector('.final__score span')
const restartBtn = document.querySelector('#restart');
const startBtn = document.querySelector('#start')
const mutleBtn = document.querySelector('#off');

// audio effects
const audioJump = document.querySelector('#audio-jump');
const audioLoose = document.querySelector('#audio-loose');
const audioLevel = document.querySelector('#audio-level');


// default values
jumpLevelr.textContent='18';
scoreBar.textContent=' 0'
level.textContent=1;

canvas.width=600;
canvas.height=550;




//game default variables
let presentTime = 2000;
let enemySpeed=5;
let animationId=null;
// sound effects
let score = 0;
let increment = 0;
let canScore = true;



// Game properties

function drawBackgroundLine(){
   ctx.beginPath();
   ctx.moveTo(0,400);
   ctx.lineTo(canvas.width,400);
   ctx.lineWidth=2;
   ctx.strokeStyle='#222';
   ctx.stroke();
}

function restart(){
    gameOver.style.display='none';
    restartBtn.blur();
    startGame();
    requestAnimationFrame(animate);
    scoreBar.textContent=0;
    level.textContent='1'
    score=0;
    
    
}


let obstacles=[]; // empty array to store the objects
// animate to update each time , 




let box = new Box(ctx,150,350,50,'blue');



function startGame(){
   box= new Box(ctx,150,350,50,'blue');
   obstacles=[];
   increment=0;
   enemySpeed=5;
   canScore=true;
   presentTime = 1000
   canvas.style.background='#ccc'
   
}


function animate(){
 document.querySelector('.game__start').style.display='none';
 document.querySelector('.stats').style.display='flex';
canvas.style.display='block'; 

  animationId= requestAnimationFrame(animate);
   ctx.clearRect(0,0,canvas.width,canvas.height);
   
   drawBackgroundLine();
   box.draw();
   increaseEnemySpeed();

   obstacles.forEach((obstacle,index)=>{
       obstacle.slide(); // this are objects qand then we can acces this slide method eachj time

        if(collide(box,obstacle)){ // its true game lost
             cancelAnimationFrame(animationId)
             console.log('collide');
             audioLoose.play();
             setTimeout(()=>{
                gameOver.style.display='flex';
                finalScore.textContent=score;
                canvas.style.display='none'
             },1000)
          
            
        }
        if(jumpOver(box,obstacle) && canScore){
            canScore=false;
            audioJump.play();
            score ++;
            scoreBar.textContent=score;
            if(score===10){
               level.textContent=2;
               audioLevel.play();
               canvas.style.background='wheat'
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


//
function getRandom(min,max){
   return Math.floor(Math.random() * (max- min + 1) + min);
}

// random interval

function randomNumberGap(timeInterval){
   let returnTime = timeInterval;
   if(Math.random()<0.5){
       returnTime += getRandom(presentTime / 3 , presentTime * 2);

      
   }
   else{
       returnTime -= getRandom(presentTime / 3 , presentTime /3);
   }
   return  returnTime;
}



function increaseEnemySpeed(){

   if(increment + 10 === score){
       increment=score;
       enemySpeed++
       
       presentTime>=100? presentTime-=100:presentTime=presentTime/2 // make the blooks appear quickly after we score 10

       //update exsiting blocks
       obstacles.forEach(obstacle=>{
           obstacle.slideSpeed= enemySpeed;
       })
   }
}


//auto generate blocks
function generateBlocks(){ // this generates some time for the blocks to appear

    let timeDelay  = randomNumberGap(presentTime); // 1000 secs get a different range of times
    let randomSize=getSize();// get the random object

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
    //returns an object 

}


function collide(box,obstacle){

   //get exact copy of class objects
   let playerInstance = Object.assign(Object.create(Object.getPrototypeOf(box)),box);
   let enemyInstance = Object.assign(Object.create(Object.getPrototypeOf(obstacle)),obstacle);


   // estimating colliton detections

   enemyInstance.size = enemyInstance.size -10;
   enemyInstance.x = enemyInstance.x + 10;

   enemyInstance.y = enemyInstance.y + 10;

   
   // returns boolean indicating if coloosion is happen or not
   return !(
       playerInstance.x>enemyInstance.x + enemyInstance.size ||
       playerInstance.x + playerInstance.size < enemyInstance.x ||
       playerInstance.y > enemyInstance.y + enemyInstance.size||
       playerInstance.y + playerInstance.size < enemyInstance.y
   )

   
}





//if the player passes the block
function jumpOver(box,obstacle){
    return (
        box.x + (box.size/2) > obstacle.x + (obstacle.size/4) &&
        box.x + (box.size/2) < obstacle.x + (obstacle.size/4) *3

    )
}



setTimeout(()=>{
    generateBlocks();

},randomNumberGap(presentTime)) // in different time interval a block will be generated

// generateBlocks();


// Event listeners

startBtn.addEventListener('click',animate);
restartBtn.addEventListener('click',restart);

addEventListener('keydown',e=>{
      if(e.code==='Space'){
          if(!box.shouldJump){
              box.jumpDistance=0;
              box.shouldJump=true;
              canScore=true;
            
          }
      }
})

// for mobile
canvas.addEventListener('mousedown',e=>{
  
        if(!box.shouldJump){
            box.jumpDistance=0;
            box.shouldJump=true;
            canScore=true;
          
        }
  
})


mutleBtn.addEventListener('click',()=>{
    let audio = document.querySelectorAll('audio');

    if(!mutleBtn.classList.contains('off-now')){
        mutleBtn.classList.add('off-now')
        audio.forEach(aud=>{
            aud.pause();
            aud.muted=true
            mutleBtn.textContent='Sound On';
            
        })
    }
    else{
        mutleBtn.classList.remove('off-now')
        audio.forEach(aud=>{
            aud.muted=false;
            mutleBtn.textContent='Sound Off';
        })
    }
      

})





