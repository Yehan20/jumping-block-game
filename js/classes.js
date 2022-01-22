class Box{
    constructor(ctx,x,y,size,color){
        this.x=x;
        this.y=y;
        this.size=size; 
        this.color=color;
        this.jumpHeight=18;
 
        // this 3 are used for jump configuarations
        this.shouldJump= false;
        this.jumpDistance=0
        this.ctx=ctx;
        this.souldIncrease=false;
 
    }
 

     jump(){
         if(this.shouldJump){
             this.jumpDistance++;
              if(this.jumpDistance<15){
                  // go up
                  this.y-=this.jumpHeight;
                  console.log('one jump');
                
 
              }
 
              else if(this.jumpDistance > 14 && this.jumpDistance< 19){ 
                  this.y +=0; // will be stationairy 
                 
                
              }
 
              else if(this.jumpDistance < 33){
                  ///come down 
                  this.y += this.jumpHeight;
              
              }
           

              // end the jump
              if(this.jumpDistance >=32){
                  this.shouldJump=false;
              }
              
         }
     }


    //draw method

    draw(){ // becuase the canavas is painting each time we need to change the postion 
        this.jump();
        let ctx=this.ctx;
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
      
    }
 }



 class Block{
    constructor(canvas,size,speed,xx,lg){ 
             this.x = canvas.width + size;
             this.y = 400 -(size-xx);
             this.size= size;
             this.sizeY=size*lg;
             this.color='red';
             this.slideSpeed =speed;
             this.ctx=ctx;
 
    }
    

    draw(){
        let ctx=this.ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.sizeY); // where shoud they come from in this canvas
    }

    slide(){
        this.draw(); // catch new position
        this.x-=this.slideSpeed;
    }
 }
 